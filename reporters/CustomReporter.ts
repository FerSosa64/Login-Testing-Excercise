import { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

class CustomReporter implements Reporter {
    private reportData: any = {
        tests: [],
        summary: {
            total: 0,
            passed: 0,
            failed: 0,
            duration: 0
        }
    };

    onTestBegin(test: TestCase) {
        console.log(`Starting test: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.reportData.tests.push({
            title: test.title,
            status: result.status,
            duration: result.duration,
            error: result.error?.message || null,
            retry: result.retry,
            screenshots: result.attachments.filter(a => a.name === 'screenshot').map(a => a.path),
            video: result.attachments.find(a => a.name === 'video')?.path
        });

        this.reportData.summary.total++;
        if (result.status === 'passed') this.reportData.summary.passed++;
        if (result.status === 'failed') this.reportData.summary.failed++;
        this.reportData.summary.duration += result.duration;
    }

    async onEnd() {
        const htmlReport = this.generateHtmlReport();
        const textReport = this.generateTextReport();
        const reportDir = path.join(process.cwd(), 'test-results');
        const htmlReportPath = path.join(reportDir, 'report.html');
        const textReportPath = path.join(reportDir, 'report.txt');
        
        fs.mkdirSync(reportDir, { recursive: true });
        fs.writeFileSync(htmlReportPath, htmlReport);
        fs.writeFileSync(textReportPath, textReport);
        console.log(`HTML report generated at: ${htmlReportPath}`);
        console.log(`Text report generated at: ${textReportPath}`);
    }

    private generateHtmlReport(): string {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Test Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .summary { background: #f5f5f5; padding: 20px; border-radius: 5px; }
                        .test { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
                        .passed { border-left: 5px solid #4CAF50; }
                        .failed { border-left: 5px solid #f44336; }
                    </style>
                </head>
                <body>
                    <h1>Test Execution Report</h1>
                    <div class="summary">
                        <h2>Summary</h2>
                        <p>Total Tests: ${this.reportData.summary.total}</p>
                        <p>Passed: ${this.reportData.summary.passed}</p>
                        <p>Failed: ${this.reportData.summary.failed}</p>
                        <p>Total Duration: ${this.reportData.summary.duration}ms</p>
                    </div>
                    <div class="tests">
                        ${this.reportData.tests.map(test => `
                            <div class="test ${test.status}">
                                <h3>${test.title}</h3>
                                <p>Status: ${test.status}</p>
                                <p>Duration: ${test.duration}ms</p>
                                ${test.error ? `<p>Error: ${test.error}</p>` : ''}
                                ${test.screenshots.length ? `
                                    <div>
                                        <h4>Screenshots:</h4>
                                        ${test.screenshots.map(s => `<img src="${s}" width="300" />`).join('')}
                                    </div>
                                ` : ''}
                                ${test.video ? `
                                    <div>
                                        <h4>Video Recording:</h4>
                                        <video width="500" controls>
                                            <source src="${test.video}" type="video/webm">
                                        </video>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </body>
            </html>
        `;
    }

    private generateTextReport(): string {
        return `
            Test Execution Report

            Summary
            -------
            Total Tests: ${this.reportData.summary.total}
            Passed: ${this.reportData.summary.passed}
            Failed: ${this.reportData.summary.failed}
            Total Duration: ${this.reportData.summary.duration}ms

            Tests
            -----
            ${this.reportData.tests.map(test => `
                Title: ${test.title}
                Status: ${test.status}
                Duration: ${test.duration}ms
                ${test.error ? `Error: ${test.error}` : ''}
                ${test.screenshots.length ? `Screenshots: ${test.screenshots.join(', ')}` : ''}
                ${test.video ? `Video: ${test.video}` : ''}
            `).join('\n')}
        `;
    }
}

export default CustomReporter;
