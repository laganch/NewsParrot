const sendgrid = require('sendgrid');
const keys = require('../config/keys');
const helper = sendgrid.mail;


class Mailer extends helper.Mail{
	constructor({subject,recipients}, content){
		super();

		this.sgApi = sendgrid(keys.sendGrid);
		this.from_email = new helper.Email('no-reply@parrot.com');
		this.subject = "News Parrot Email Confirmation";
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	};
	formatAddresses(recipients){
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		})
	};
	addClickTracking(){
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);


		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	};
	addRecipients(){
		const personalize = new helper.Personalization();

		this.recipients.forEach(recipients=>{
			personalize.addTo(recipients);
		});
		this.addPersonalization(personalize);
	};
	async send(){
		const request = this.sgApi.emptyRequest({
			method:'POST',
			path:'/v3/mail/send',
			body: this.toJSON()
		});

		 const responds = await this.sgApi.API(request);
		return responds;
	};
}

module.exports = Mailer;