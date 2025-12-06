"use server";

import nodemailer from "nodemailer"
interface props{
    nom : string
    mail : string
    phone : string
    object : string
    message : string
}

export const sendMessage = async ({nom, mail, phone, object, message} : props ) => {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    const mailOptions = {
        from: mail,
        to: process.env.EMAIL_RECEIVER,
        subject: object,
        text: message,
        html: `
        <!DOCTYPE html>
            <head>
                <style>
                    @import url('fonts.googleapis.com');
                    
                    .christmas-font {
                        /* CORRECTION 2: Ajout des polices de secours (fallback) */
                        font-family: 'Mountains of Christmas', cursive, Arial, sans-serif !important;
                    }
                    .christmas-title {
                        font-family: 'Mountains of Christmas', cursive, Arial, sans-serif !important;
                    }
                </style>
            </head>
            <body>
                <div
                class="christmas-font"
                style="
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #d6f1bf;
                border-radius: 10px;
                
                "
            >
                <div
                style="
                    background: linear-gradient(to right, #D4FC79, #96E6A1);
                    padding: 30px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                    margin-bottom: 20px;
                "
                >
                <h1
                    style="
                    color: #0b1a05;
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                "
                >
                    📨 my-ref 📨
                </h1>
                </div>

                <div
                style="padding: 30px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px #0b1a05;
                    line-height: 1.6;
                    color: #0b1a05;
                "
                >
                <p style="font-size: 24px; margin-bottom: 20px;">Salut 👋👋, Tu as un nouveau message</p>

                <p style=" font-size: 16px; margin-bottom: 20px;">
                    📧Objet:
                    <strong style="color: #297a09;">
                    ${object}
                    </strong>
                </p>

                <div
                    style="
                    background: linear-gradient(to left, #D4FC79, #96E6A1);
                    border-left: 4px solid #1c5523;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 4px 8px 8px 4px;
                "
                >
                    <h2
                    style="
                        font-size: 18px;
                        font-weight: bold;
                        color: #033828;
                        margin-bottom: 10px;
                    "
                    >
                    </h2>
                    <p
                    style="
                        font-size: 16px;
                        margin-bottom: 0;
                        color : #03241a;
                    "
                    >
                    "${message}"
                    </p>
                </div>

                <hr style=" border: 1px solid #e2e8f0; margin: 30px 0;" />

                <h2
                    style="
                    font-size: 20px;
                    font-weight: bold;
                    color: #048825;
                    margin-bottom: 15px;
                    "
                >
                    Envoyé par:
                </h2>

                <table
                    style="
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    line-height: 1.5;
                    font-size: 16px
                "
                >
                    <tr>
                    <td
                        style="
                        padding: 8px;
                        border-bottom: 1px solid #D4FC79;
                        font-weight: bold;
                        width: 30%;
                        "
                    >
                        Nom :
                    </td>
                    <td style=" padding: 8px; border-bottom: 1px solid #D4FC79;">${nom}</td>
                    </tr>
                    
                    <tr>
                    <td
                        style="
                        padding: 8px;
                        border-bottom: 1px solid #D4FC79;
                        font-weight: bold;
                        "
                    >
                        Email :
                    </td>
                    <td style="padding: 8px; border-bottom: 1px solid #D4FC79; color: #28052e !important;">
                        ${mail}
                    </td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Phone :</td>
                    <td style=" padding: 8px;">${phone}</td>
                    </tr>
                </table>

                
                </div>

                <div
                style="
                    text-align: center;
                    padding-top: 20px;
                    color: #490a74;
                    font-size: 12px;
                "
                >
                <p>© 2025 propulsé par Edwardo Ignace.</p>
                </div>
            </div>
            </body>
            </html>
        `,
    }

    try{
        await transporter.sendMail(mailOptions)
         console.log("Message envoyé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
        throw new Error("Erreur lors de l'envoi de l'e-mail");
    }
    
}