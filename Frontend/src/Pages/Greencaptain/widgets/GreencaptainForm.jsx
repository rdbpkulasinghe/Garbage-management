import { useEffect, useState } from 'react';
import { POST, PUT } from '../../../helpers/HttpHelper';

function GreencaptainForm({ fetchMedicines, GreencaptainOne, districts }) {
	const user = JSON.parse(localStorage.getItem('user'));
	console.log(user);
	console.log(GreencaptainOne);
	const [createdUserId, setCreatedUserId] = useState(user.id);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [email, setEmail] = useState('');
	const [contactNo, setContactNo] = useState('');
	const [district, setDistrict] = useState('');
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (Object.keys(GreencaptainOne).length !== 0) {
			setName(GreencaptainOne.name);
			setDescription(GreencaptainOne.description);
			setAddress(GreencaptainOne.address);
			setEmail(GreencaptainOne.email);
			setContactNo(GreencaptainOne.contactNo);
			setDistrict(GreencaptainOne?.district);
			setIsShow(true);
		} else {
			setName('');
			setDescription('');
			setAddress('');
			setEmail('');
			setContactNo('');
			setDistrict('');
			setIsShow(false);
		}
	}, [GreencaptainOne]);

	const handleSubmit = async () => {
		try {
			if (!name || !description || !contactNo) {
				alert('Please fill all fields');
				return;
			}
			// contactNo is a string and max length is 9
			if (contactNo.length > 9) {
				alert('Contact number must be 9 digits');
				return;
			}
			const users = {
				createdUserId,
				name,
				description,
				address,
				email,
				contactNo,
				district,
			};

			console.log(users);
			const response = await POST('/pharmacy', users);
			console.log(response);
			fetchMedicines();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (!name || !description || !contactNo) {
				alert('Please fill all fields');
				return;
			}
			const users = {
				id: GreencaptainOne.id,
				createdUserId,
				name,
				description,
				address,
				email,
				contactNo,
				district,
			};

			console.log(users);
			const response = await PUT('/Greencaptain', users);
			console.log(response);

			fetchMedicines();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setName('');
		setDescription('');
		setAddress('');
		setEmail('');
		setContactNo('');
		setIsShow(false);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4">Green Captain</h1>
			<div className="w-full sm:max-w-md xl:max-w-lg">
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="name"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Name
						</label>
						<input
							id="name"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="description"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Description
						</label>
						<input
							id="description"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="description"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Address
						</label>
						<input
							id="address"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
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
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
						<label
							htmlFor="email"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Email
						</label>
						<input
							id="email"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="w-full md:w-1/2 px-3">
						<label
							htmlFor="contactNo"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Contact No
						</label>
						<input
							id="contactNo"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							value={contactNo}
							onChange={(e) => setContactNo(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center justify-between gap-10">
					{isShow ? (
						<>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								email="submit"
								onClick={handleUpdate}
							>
								Edit
							</button>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								email="submit"
								onClick={handleClear}
							>
								Clear
							</button>
						</>
					) : (
						<button
							className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							email="submit"
							onClick={handleSubmit}
						>
							Add
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default GreencaptainForm;
