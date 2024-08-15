import React, { useEffect, useState } from 'react';
import { POST, PUT } from '../../../helpers/HttpHelper';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Geocode from 'react-geocode';
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyBHo7USjY02Fry86RLFaywrTV8YCd42VIY');

// set response language. Defaults to english.
Geocode.setLanguage('en');
Geocode.setLocationType('ROOFTOP');

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const containerStyle = {
	width: '400px',
	height: '400px',
};

const center = {
	lat: 6.927079,
	lng: 79.861244,
};

const position = {
	lat: 6.924896,
	lng: 79.868631,
};

const onLoading = (marker) => {
	console.log('marker: ', marker);
};

function OrderForm({ fetchMedicines, GreencaptainOne, districts }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBHo7USjY02Fry86RLFaywrTV8YCd42VIY',
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);
	// localStorage.getItem('user') get user from local storage json
	const user = JSON.parse(localStorage.getItem('user'));
	// console.log(user);
	// console.log(GreencaptainOne);
	const [createdUserId, setCreatedUserId] = useState(user.id);
	const [dueDate, setDueDate] = useState('');
	const [notes, setNotes] = useState('');
	const [district, setDistrict] = useState('');
	const [address, setAddress] = useState('');
	const [image, setImage] = useState('');
	const [isShow, setIsShow] = useState(false);
	const [position, setPosition] = useState({ lng: null, lat: null });

	useEffect(() => {
		if (Object.keys(GreencaptainOne).length !== 0) {
			setDueDate(GreencaptainOne.dueDate);
			setNotes(GreencaptainOne.notes);
			setDistrict(GreencaptainOne.district);
			setPosition((preValue) => ({
				lat: GreencaptainOne.lat,
				lng: GreencaptainOne.lng,
			}));
			setAddress(GreencaptainOne.address);
			// setImage(GreencaptainOne.image);
			setIsShow(true);

			// formData.append('lng', position.lng);
			// formData.append('lat', position.lat);
		} else {
			setDueDate('');
			setNotes('');
			setDistrict('');
			setImage('');
			setAddress('');
			setIsShow(false);
		}
	}, [GreencaptainOne]);

	const setMarker = (e) => {
		console.log(e);
		setPosition((preValue) => ({
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}));
		Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
			(response) => {
				console.log(response);
				const ads = response.results[0].formatted_address;
				console.log(ads);
				setAddress(response.results[0].formatted_address);
			},
			(error) => {
				console.error(error);
			}
		);

		console.log(position);
	};

	const handleSubmit = async () => {
		try {
			if (!dueDate || !notes || !image) {
				alert('Please fill all fields');
				return;
			}

			const formData = new FormData();
			formData.append('createdUserId', createdUserId);
			formData.append('dueDate', new Date(dueDate).toISOString());
			formData.append('notes', notes);
			formData.append('district', district);
			formData.append('address', address);
			formData.append('image', image);
			formData.append('lng', position.lng);
			formData.append('lat', position.lat);

			console.log(formData);

			const response = await POST('/order', formData);
			console.log(response);
			fetchMedicines();
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (!dueDate || !notes || !image) {
				alert('Please fill all fields');
				return;
			}

			const formData = new FormData();
			formData.append('id', GreencaptainOne.id);
			formData.append('createdUserId', createdUserId);
			formData.append('dueDate', new Date(dueDate).toISOString());
			formData.append('notes', notes);
			formData.append('district', district);
			formData.append('image', image);
			formData.append('lng', position.lng);
			formData.append('lat', position.lat);

			const response = await PUT('/order', formData);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setDueDate('');
		setNotes('');
		setDistrict('');
		setImage('');
		setIsShow(false);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4">Add Report</h1>
			<div className="w-full ">
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="dueDate"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Due Date
						</label>
						<input
							id="dueDate"
							type="date"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="notes"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Note
						</label>
						<input
							id="notes"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="district"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							District
						</label>
						<select
							id="district"
							className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={district}
							onChange={(e) => setDistrict(e.target.value)}
						>
							<option value="">choose the district where you live</option>
							{districts.map((district) => (
								<option key={district.id} value={district.id}>
									{district.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3 mb-3">
						<label
							htmlFor="image"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Image
						</label>
						<input
							id="image"
							type="file"
							accept="image/*"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
						/>
					</div>
				</div>
				<div>
					{isLoaded ? (
						<div style={{ height: '100%', width: '100%' }}>
							<GoogleMap
								mapContainerStyle={containerStyle}
								center={center}
								zoom={12}
								onLoad={onLoad}
								onUnmount={onUnmount}
								onDblClick={(e) => setMarker(e)}
							>
								<Marker onLoad={onLoading} position={position}></Marker>

								<></>
							</GoogleMap>
						</div>
					) : (
						<div>loading.......</div>
					)}
				</div>

				<div className="flex items-center justify-between gap-10">
					{isShow ? (
						<>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								image="submit"
								onClick={handleUpdate}
							>
								Edit
							</button>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								image="submit"
								onClick={handleClear}
							>
								Clear
							</button>
						</>
					) : (
						<button
							className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							image="submit"
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

export default OrderForm;
