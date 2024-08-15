import { useState, useEffect } from 'react';
import { GET, POST } from '../../helpers/HttpHelper';
import jwt_decode from 'jwt-decode';
import logo from './logo.png';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const SignInSide = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordType, setPasswordType] = useState('password');

	const [articles, setArticles] = useState([]);

	const loginHandler = async () => {
		try {
			const response = await POST('/auth/login', { email, password });
			const decode = jwt_decode(response.token);
			console.log(decode);

			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(decode));
			window.location.href = '/';
		} catch (error) {
			if (!window.confirm('Check whether entered password and email correct. ?')) {
				return;
			}
			console.log(error);
		}
	};
	
	const togglePassword = () => {
		if (passwordType === 'password') {
			setPasswordType('text');
			return;
		}
		setPasswordType('password');
	};

	const fetchArticles = async () => {
		try {
			const response = await GET('/article');
			setArticles(response.data);
			return;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	return (
		<div className="md:grid md:grid-cols-3">
			<div className="md:col-span-2 hidden md:block self-center">
				<div className=" flex items-center justify-center ">
					{/* <img className="w-2/5" src={logo} alt="logo" /> */}
					<Carousel>
						{articles?.map((article) => {
							return (
								<div key={article.id}>
									<img src={`data:image/png;base64,${article?.image || ''}`} />
									<h1 className="legend">{article.notes}</h1>
								</div>
							);
						})}
					</Carousel>
				</div>
			</div>
			<div className="flex flex-col gap-3 border-l-2 shadow-2xl border-t-gray-600 p-6 lg:p-16 h-screen items-center justify-center">
				<div className=" flex items-center justify-center ">
					<img className="w-2/4" src={logo} alt="logo" />
				</div>
				<input
					className="bg-gray-300 rounded p-2  w-full hover:bg-slate-200"
					placeholder="Email Address"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="flex w-full">
					<input
						type={passwordType}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						name="password"
						className="bg-gray-300 rounded rounded-tr-none rounded-br-none p-2 w-full hover:bg-slate-200"
						placeholder="Password"
					/>

					{passwordType === 'password' ? (
						<button
							className="bg-gray-300 rounded rounded-tl-none rounded-bl-none p-2  hover:bg-slate-200"
							onClick={togglePassword}
						>
							<i className="fa-solid fa-eye"></i>
						</button>
					) : (
						<button
							className="bg-gray-500 rounded rounded-tl-none rounded-bl-none p-2  hover:bg-slate-600"
							onClick={togglePassword}
						>
							<i className="fa-sharp fa-solid fa-eye-slash"></i>
						</button>
					)}
				</div>

				<button
					className="bg-blue-500 rounded w-1/2 p-2  hover:bg-blue-600 text-white font-bold"
					onClick={loginHandler}
				>
					Login
				</button>
				<div className="flex flex-col md:flex-row items-center justify-center">
					<p className="text-gray-500 text-sm">Don't have an account?</p>
					<a href="/Registration" className="text-blue-500  text-sm ml-2">
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
};

export default SignInSide;
