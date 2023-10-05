const whiteList = ["https://silver-managment.netlify.app", "https://silver-managment-client.netlify.app"];

export const corsOrigins = {
	origin: (origin, callback) => {
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable || origin === undefined) callback(null, origin); // origin = undefined -> on localhost
		else callback(`${origin}: Not Allowed By CORS`);
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
