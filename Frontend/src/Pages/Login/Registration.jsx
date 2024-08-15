import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../helpers/HttpHelper';
import districtJson from '../Data/Data.json';

function Registration() {
	const user = JSON?.parse(localStorage?.getItem('user'));
	console.log(user);
	const [createdUserId, setCreatedUserId] = useState(0);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('admin@gmail.com');
	const [password, setPassword] = useState('123456');
	const [role, setRole] = useState(1);
	const [pharmacyId, setPharmacyId] = useState(0);
	const [district, setDistrict] = useState('');
	const { districts } = districtJson;
	const [contactNo, setContactNo] = useState('');

	const [passwordType, setPasswordType] = useState('password');

	const handleSubmit = async () => {
		try {
			if (!firstName || !lastName || !email || !password || !role || !district || !contactNo) {
				alert('Please fill all fields');
				return;
			}
			
			const ob = {
				createdUserId: Number(createdUserId),
				firstName,
				lastName,
				email,
				password,
				role,
				district,
				contactNo
			};
			console.log(ob);
			const response = await POST('/user', ob);
			window.location.href = '/';
		} catch (error) {
			
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

	const [Greencaptainist, setGreencaptainist] = useState([]);
	const getAllGreencaptainist = async () => {
		try {
			const response = await GET('/Greencaptain');
			console.log(response);
			setGreencaptainist(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllGreencaptainist();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-6">User Registration</h1>
			<div className="w-full md:max-w-md md:px-0 file:px-10">
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="firstName"
						>
							First Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="firstName"
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="lastName"
						>
							Last Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="lastName"
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="address"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							District
						</label>
						<select
							id="address"
							className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={district}
							onChange={(e) => setDistrict(e.target.value)}
						>
							<option value="">Select District</option>
							{districts.map((district) => (
								<option key={district.id} value={district.id}>
									{district.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<div className="flex">
							<input
								className="appearance-none block w-full rounded-tr-none rounded-br-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="password"
								type={passwordType}
								placeholder="Password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
							{passwordType === 'password' ? (
								<button
									className="bg-gray-300 rounded rounded-tl-none rounded-bl-none py-3 px-4 mb-3  hover:bg-slate-200 "
									onClick={togglePassword}
								>
									<i className="fa-solid fa-eye"></i>
								</button>
							) : (
								<button
									className="bg-gray-500 rounded rounded-tl-none rounded-bl-none py-3 px-4 mb-3  hover:bg-slate-600"
									onClick={togglePassword}
								>
									<i className="fa-sharp fa-solid fa-eye-slash"></i>
								</button>
							)}
						</div>
					</div>
				</div>
				{user?.role === 0 && (
					<>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="role"
								>
									Role
								</label>
								<select
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="role"
									value={role}
									onChange={(event) => setRole(event.target.value)}
								>
									<option value="">Select Role</option>
									<option value="0">Admin</option>
									<option value="1">Greencaptain</option>
									<option value="2">GTFmember</option>
								</select>
							</div>
						</div>

						<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="contactNo"
						>
							Contact No
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="contactNo"
							type="text"
							placeholder="Contact No"
							value={contactNo}
							onChange={(event) => setContactNo(event.target.value)}
						/>
					</div>
				</div>
					</>
				)}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							onClick={handleSubmit}
						>
							Submit
						</button>
						<div className="flex flex-col md:flex-row items-center justify-center">
							<p className="text-gray-500 text-sm italic">Already have an account?</p>
							<a className="text-blue-500 hover:text-blue-700 text-sm italic" href="/">
								Login
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Registration;
