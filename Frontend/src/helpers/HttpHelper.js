import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

/**
 * GET request handler
 */
export const GET = async (uri) => {
	try {
		const path = `${url}${uri}`;
		const res = await axios.get(path);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

/**
 * POST request handler
 */
export const POST = async (uri, data) => {
	try {
		const path = `${url}${uri}`;
		const res = await axios.post(path, data);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

/**
 * PUT request handler
 */
export const PUT = async (uri, data) => {
	try {
		const path = `${url}${uri}`;
		const res = await axios.put(path, data);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const DELETE = async (uri) => {
	try {
		const path = `${url}${uri}`;
		const res = await axios.delete(path);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
