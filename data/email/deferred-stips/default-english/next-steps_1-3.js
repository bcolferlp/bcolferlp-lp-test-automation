module.exports = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
</head>
<body style="-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important">
<style>@media only screen and (max-width: 596px) {
    .small-float-center {
        margin: 0 auto !important;
        float: none !important;
        text-align: center !important
    }

    .small-text-center {
        text-align: center !important
    }

    .small-text-left {
        text-align: left !important
    }

    .small-text-right {
        text-align: right !important
    }
}

@media only screen and (max-width: 596px) {
    table.body table.container .hide-for-large {
        display: block !important;
        width: auto !important;
        overflow: visible !important
    }
}

@media only screen and (max-width: 596px) {
    table.body table.container .row.hide-for-large {
        display: table !important;
        width: 100% !important
    }
}

@media only screen and (max-width: 596px) {
    table.body table.container .show-for-large {
        display: none !important;
        width: 0;
        mso-hide: all;
        overflow: hidden
    }
}

@media only screen and (max-width: 596px) {
    table.body img {
        width: auto !important;
        height: auto !important
    }

    table.body center {
        min-width: 0 !important
    }

    table.body .container {
        width: 95% !important
    }

    table.body .column, table.body .columns {
        height: auto !important;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 16px !important;
        padding-right: 16px !important
    }

    table.body .column .column, table.body .column .columns, table.body .columns .column, table.body .columns .columns {
        padding-left: 0 !important;
        padding-right: 0 !important
    }

    table.body .collapse .column, table.body .collapse .columns {
        padding-left: 0 !important;
        padding-right: 0 !important
    }

    td.small-1, th.small-1 {
        display: inline-block !important;
        width: 8.33333% !important
    }

    td.small-2, th.small-2 {
        display: inline-block !important;
        width: 16.66667% !important
    }

    td.small-3, th.small-3 {
        display: inline-block !important;
        width: 25% !important
    }

    td.small-4, th.small-4 {
        display: inline-block !important;
        width: 33.33333% !important
    }

    td.small-5, th.small-5 {
        display: inline-block !important;
        width: 41.66667% !important
    }

    td.small-6, th.small-6 {
        display: inline-block !important;
        width: 50% !important
    }

    td.small-7, th.small-7 {
        display: inline-block !important;
        width: 58.33333% !important
    }

    td.small-8, th.small-8 {
        display: inline-block !important;
        width: 66.66667% !important
    }

    td.small-9, th.small-9 {
        display: inline-block !important;
        width: 75% !important
    }

    td.small-10, th.small-10 {
        display: inline-block !important;
        width: 83.33333% !important
    }

    td.small-11, th.small-11 {
        display: inline-block !important;
        width: 91.66667% !important
    }

    td.small-12, th.small-12 {
        display: inline-block !important;
        width: 100% !important
    }

    .column td.small-12, .column th.small-12, .columns td.small-12, .columns th.small-12 {
        display: block !important;
        width: 100% !important
    }

    .body .column td.small-1, .body .column th.small-1, .body .columns td.small-1, .body .columns th.small-1, td.small-1 center, th.small-1 center {
        display: inline-block !important;
        width: 8.33333% !important
    }

    .body .column td.small-2, .body .column th.small-2, .body .columns td.small-2, .body .columns th.small-2, td.small-2 center, th.small-2 center {
        display: inline-block !important;
        width: 16.66667% !important
    }

    .body .column td.small-3, .body .column th.small-3, .body .columns td.small-3, .body .columns th.small-3, td.small-3 center, th.small-3 center {
        display: inline-block !important;
        width: 25% !important
    }

    .body .column td.small-4, .body .column th.small-4, .body .columns td.small-4, .body .columns th.small-4, td.small-4 center, th.small-4 center {
        display: inline-block !important;
        width: 33.33333% !important
    }

    .body .column td.small-5, .body .column th.small-5, .body .columns td.small-5, .body .columns th.small-5, td.small-5 center, th.small-5 center {
        display: inline-block !important;
        width: 41.66667% !important
    }

    .body .column td.small-6, .body .column th.small-6, .body .columns td.small-6, .body .columns th.small-6, td.small-6 center, th.small-6 center {
        display: inline-block !important;
        width: 50% !important
    }

    .body .column td.small-7, .body .column th.small-7, .body .columns td.small-7, .body .columns th.small-7, td.small-7 center, th.small-7 center {
        display: inline-block !important;
        width: 58.33333% !important
    }

    .body .column td.small-8, .body .column th.small-8, .body .columns td.small-8, .body .columns th.small-8, td.small-8 center, th.small-8 center {
        display: inline-block !important;
        width: 66.66667% !important
    }

    .body .column td.small-9, .body .column th.small-9, .body .columns td.small-9, .body .columns th.small-9, td.small-9 center, th.small-9 center {
        display: inline-block !important;
        width: 75% !important
    }

    .body .column td.small-10, .body .column th.small-10, .body .columns td.small-10, .body .columns th.small-10, td.small-10 center, th.small-10 center {
        display: inline-block !important;
        width: 83.33333% !important
    }

    .body .column td.small-11, .body .column th.small-11, .body .columns td.small-11, .body .columns th.small-11, td.small-11 center, th.small-11 center {
        display: inline-block !important;
        width: 91.66667% !important
    }

    table.body td.small-offset-1, table.body th.small-offset-1 {
        margin-left: 8.33333% !important;
        Margin-left: 8.33333% !important
    }

    table.body td.small-offset-2, table.body th.small-offset-2 {
        margin-left: 16.66667% !important;
        Margin-left: 16.66667% !important
    }

    table.body td.small-offset-3, table.body th.small-offset-3 {
        margin-left: 25% !important;
        Margin-left: 25% !important
    }

    table.body td.small-offset-4, table.body th.small-offset-4 {
        margin-left: 33.33333% !important;
        Margin-left: 33.33333% !important
    }

    table.body td.small-offset-5, table.body th.small-offset-5 {
        margin-left: 41.66667% !important;
        Margin-left: 41.66667% !important
    }

    table.body td.small-offset-6, table.body th.small-offset-6 {
        margin-left: 50% !important;
        Margin-left: 50% !important
    }

    table.body td.small-offset-7, table.body th.small-offset-7 {
        margin-left: 58.33333% !important;
        Margin-left: 58.33333% !important
    }

    table.body td.small-offset-8, table.body th.small-offset-8 {
        margin-left: 66.66667% !important;
        Margin-left: 66.66667% !important
    }

    table.body td.small-offset-9, table.body th.small-offset-9 {
        margin-left: 75% !important;
        Margin-left: 75% !important
    }

    table.body td.small-offset-10, table.body th.small-offset-10 {
        margin-left: 83.33333% !important;
        Margin-left: 83.33333% !important
    }

    table.body td.small-offset-11, table.body th.small-offset-11 {
        margin-left: 91.66667% !important;
        Margin-left: 91.66667% !important
    }

    table.body table.columns td.expander, table.body table.columns th.expander {
        display: none !important
    }

    table.body .right-text-pad, table.body .text-pad-right {
        padding-left: 10px !important
    }

    table.body .left-text-pad, table.body .text-pad-left {
        padding-right: 10px !important
    }

    table.menu {
        width: 100% !important
    }

    table.menu td, table.menu th {
        width: auto !important;
        display: inline-block !important
    }

    table.menu.small-vertical td, table.menu.small-vertical th, table.menu.vertical td, table.menu.vertical th {
        display: block !important
    }

    table.menu[align=center] {
        width: auto !important
    }

    table.button.expand {
        width: 100% !important
    }
}

.btn {
  padding: 8px 16px;
  text-decoration: none;
  font-family: sans-serif;
  border-radius: 4px;
  border: 2px solid #e08244;
}
.btn.filled {
  background: #e08244;
  color: white;
}
.btn.bordered {
  color: #e08244;
}
</style>
<table class="body" data-made-with-foundation=""
       style="Margin:0;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%">
    <tbody>
    <tr style="padding:0;text-align:left;vertical-align:top">
        <td class="center" align="center" valign="top"
            style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
            <center data-parsed="" style="width:100%">
                <div class="header text-center" align="center"
                     style="background:#191919;color:#fff;font-size:18px;font-weight:500">
                    <table class="container"
                           style="background:#191919;border-collapse:collapse;border-spacing:0;margin:0 auto;padding-bottom:16px;padding-top:16px;padding-left:16px;vertical-align:top;width:100%">
                        <tbody>
                        <tr style="padding:0;text-align:left;vertical-align:top">
                            <td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;padding-bottom:16px;padding-top:16px;text-align:left;vertical-align:top;word-wrap:break-word">
                                <table class="row collapse"
                                       style="border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%">
                                    <tbody>
                                    <tr style="padding:0;text-align:left;vertical-align:top">
                                        <th class="small-4 large-4 columns first"
                                            style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:201.33px">
                                            <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%;margin-left:20px;">
                                                <tbody>
                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                    <th style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left">
                                                        <img src="https://s3-us-west-2.amazonaws.com/loanpal-emails/loanpal-white.png"
                                                             alt="LoanPal"
                                                             style="-ms-interpolation-mode:bicubic;clear:both;display:block;width:137px;;outline:0;text-decoration:none;width:auto">
                                                    </th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                        <th class="small-8 large-8 columns last"
                                            style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:394.67px">
                                            <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                                <tbody>
                                                <tr style="padding:0;text-align:left;vertical-align:top">
                                                    <th style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left">
                                                        <p style="color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-top:10px;margin-right:20px;padding:0;text-align:right;">
                                                            (844) 910-0111</p></th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <table class="container text-center"
                       style="Margin:0 auto;background:#fefefe;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:80%">
                    <tbody>
                    <tr style="padding:0;text-align:left;vertical-align:top">
                        <td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                            <br>
                            <table class="row"
                                   style="border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                <tr>
                                    <th class="small-12 large-1 columns first last"
                                        style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:32.33px">
                                        <table id="includeMessage"
                                               style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                            <tbody>
                                            <tr style="padding:0;text-align:left;vertical-align:top">
                                                <th style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left">
                                                    <p style="color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:18px;line-height:25px;margin:0;margin-bottom:30px;margin-top:20px;padding:0;text-align:center">
                                                        <!--You've applied for a solar loan.-->You've applied for a solar loan.</p>
    <p>Congratulations, John!</p>
    <p>You have been approved for a Loanpal loan up to a maximum of $20,000 to purchase a solar system for your home under the following products:</p>
    <ul><li>20 year 3.99% interest rate loan</li></ul>
    <p>Please do not hesitate to call the Loanpal team with any questions about the terms of the loan agreement at <u>(844) 910-0111</u>.</p>
    <p>We look forward to funding your loan once the required documents are received and reviewed, final loan documents are signed, and your solar system is installed.</p>
    <p>We take pride in our ability to help our clients with their financing needs, and we are excited for you to become a part of our Loanpal family.</p>
    <p><b>Next Steps</b></p>
    <ol><li>Get your loan docs by clicking the button below, once you receive them please review and sign.<br/><p><a href="secureLink" class="btn filled">Get loan docs</a></p></li><li>You should also expect a call from Loanpal to validate your identity.</li></ol>
    <p>Reference Number: ABC-123456</p>
    <p>Application ID: 12-34-567890</p>
    <p></p>
    <p>Best Regards,</p>
    <p>The Loanpal Team</p><p
                                                        style="Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left"></p>
                                                </th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="container text-center"
                       style="Margin:0 auto;background:#f3f3f3;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
                    <tbody>
                    <tr style="padding:0;text-align:left;vertical-align:top">
                        <td style="-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                            <br>
                            <table class="row"
                                   style="border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                <tr>
                                    <th class="small-12 large-1 columns first last"
                                        style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:32.33px">
                                        <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                            <tbody>
                                            <tr style="padding:0;text-align:left;vertical-align:top">
                                                <th style="Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left">
                                                    <p class="disclaimer"
                                                       style="Margin:0;Margin-bottom:10px;color:#8c8c8c;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center">
                                                        <span style="font-style:italic;">Copyright <span
                                                                style="width:10px !important;height:10px !important;">&copy;</span> 2017 LoanPal All rights reserved</span>
                                                        <br>8781 Sierra College Blvd <br>Roseville, CA 95661 <br> <br>
                                                        <br>You are receiving this email because you agreed to receive
                                                        electronic communications from LoanPal <br> <br>Want to stop
                                                        receiving these emails? <br>You can <a
                                                            href="{{unsubscribeLink}}"
                                                            style="Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none;cursor:pointer;">unsubscribe
                                                        from this list</a> <br> <br><strong><a classname="bold"
                                                                                               href="https://www.loanpal.com"
                                                                                               style="Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none">LoanPal</a>
                                                        | <a href="http://loanpal.com/privacy.html"
                                                             style="Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none">Private
                                                            Policy</a></strong></p></th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </center>
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>
`;
