const whiteList = ["https://silver-managment-server.netlify.app", "https://silver-managment-client.netlify.app", "http://localhost:5000", "http://localhost:5173", "http://localhost:5174"];

export const corsOrigins = {
	origin: (origin, callback) => {
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable) callback(null, origin);
		else callback(`${origin}: Not Allowed By CORS`);
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
