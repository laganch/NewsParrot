module.exports = (clients)=>{
	return `
		<html>
		<body>
			<div style="text-align: center;">
				<h2>Please we would like to know what you think</h2>
				<p>you recieved this email as a client and we would like to know if you enjoyed our services the last time you where in our office</p>
				<p>NewParrot Please confirm your email</p>
				<div>
					<a href="http://192.168.43.44:3000/auth/survey/${clients.id}/${clients.name}/yes" style="margin: 50px">Yes</a>
					<a href="http://192.168.43.44:3000/auth/survey/${clients.id}/${clients.name}/no" style="margin: 50px">No</a>
					<a href="http://192.168.43.44:3000/auth/survey/${clients.id}/${clients.name}/maybe" style="margin: 50px">Not sure</a>
				</div>
			</div>
		</body>
		</html>
	`
};