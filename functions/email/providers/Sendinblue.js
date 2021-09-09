import EmailProvider from "./EmailProvider.js";
import fetch from 'node-fetch';
import Settings from "../../settings/index.js";

export default class Sendinblue extends EmailProvider{
  constructor(){
    super();
  }
  async send({
    subject,
    htmlContent,
    toAddress,
    toDisplayName,
    fromAddress,
    fromDisplayName
  }){
    super.send({
      subject,
      htmlContent,
      subject,
      toAddress,
      toDisplayName,
      fromAddress,
      fromDisplayName
    });

    const settings = await Settings.getAll(false,true);

    const apiKey = settings.admin.sendinblue.apiKey;

    const response = await fetch('https://api.sendinblue.com/v3/smtp/email',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender:{
          name: fromDisplayName,
          email: fromAddress,
        },
        to: [{
          name: toDisplayName,
          email: toAddress,
        }],
        subject,
        htmlContent,
      }),
    });

    if(!response.ok)
      throw new Error(await response.text());
  }

  async subscribe(email){
    super.subscribe(email);

    const settings = await Settings.getAll(false,true);

    const apiKey = settings.admin.sendinblue.apiKey;
    const listId = settings.admin.sendinblue.newsletterListId;

    await fetch('https://api.sendinblue.com/v3/contacts',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        emailBlacklisted: false,
        updateEnabled: true,
      }),
    });
  }
}
