
exports.refuseCandidature = (user,offre) => {
    return `


    <html>

    <head>
    
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }
    
            body,
            table,
            td,
            a {
                -ms-text-size-adjust: 100%;
                /* 1 */
                -webkit-text-size-adjust: 100%;
                /* 2 */
            }
    
            table,
            td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
            }
    
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
    
            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            a {
                color: #BE1721;
            }
    
            img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
            }
        </style>
    
    </head>
    
    <body style="background-color: #e9ecef;">
    
        
    
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
            <tr>
                <td align="center" bgcolor="#e9ecef">
    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <img src="https://www.hrmaps.fr/wp-content/uploads/2020/03/logo.png" alt="Logo" border="0"
                                    width="80" style="display: block; width: 80px; max-width: 80px; min-width: 48px;">
                            </td>
                        </tr>
                    </table>
    
                </td>
            </tr>
    
    
            <tr>
                <td bgcolor="#FFFFFF" style="border: 1px solid #eeeeee; background-color: #ffffff; border-radius:5px; display:block!important; max-width:600px!important; margin:0 auto!important; clear:both!important;"><div style="padding:20px; max-width:600px; margin:0 auto; display:block;">
                <table style="width: 100%;">
                <tr>
                <h1 style="font-weight: 200; font-size: 16px; margin: 20px 0 30px 0; color: #333333;">Bonjour ${user.fullName}</h1>
                 <h1 style="font-weight: 200; font-size: 16px; margin: 20px 0 30px 0; color: #333333;">Nous tenons tout d'abord à vous remercier pour l'intérêt que vous avez porté à HRMaps et pour votre candidature pour l'offre: <a href=${process.env.FRONTEND_URL+"/offre/"+offre._id}> ${offre.title}</a>
                 </h1>
    <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;"> Nous avons étudié votre candidature avec attention et nous sommes conscients de vos atouts. Malheureusement, nous avons décidé de ne pas retenir votre candidature pour ce poste actuellement.</h2>
    <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;"> Nous vous souhaitons un bon courage, une bonne continuation, et beaucoup de succès dans vos futures recherches d'emploi. </h2>

                <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;"> Cordialement </h2>
                <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;"> L'équipe de HRMaps</h2>
                <p style="text-align: center; display: block; padding-top:20px; font-weight: bold; margin-top:30px; color: #666666; border-top:1px solid #dddddd;"><a href=${process.env.FRONTEND_URL}>HRMaps</a> </p></td>
                </tr>
    
        </table>
    
        </td>
        </tr>
    
        </table>
    
    </body>
    
    </html>  
    
    




 `;
  };