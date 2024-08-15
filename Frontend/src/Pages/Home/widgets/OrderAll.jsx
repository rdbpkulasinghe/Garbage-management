import React, { useEffect, useState } from 'react';
import { DELETE, GET, POST, PUT } from '../../../helpers/HttpHelper';
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
	width: '800px',
	height: '400px',
};

const center = {
	lat: 6.927079,
	lng: 79.928026,
};

const position = {
	lat: 6.924896,
	lng: 79.928026,
};

const onLoading = (marker, pos) => {
	console.log('marker: ', marker);
	const customIcon = (opts) =>
		Object.assign(
			{
				path: 'M7.8,1.3L7.8,1.3C6-0.4,3.1-0.4,1.3,1.3c-1.8,1.7-1.8,4.6-0.1,6.3c0,0,0,0,0.1,0.1 l3.2,3.2l3.2-3.2C9.6,6,9.6,3.2,7.8,1.3C7.9,1.4,7.9,1.4,7.8,1.3z M4.6,5.8c-0.7,0-1.3-0.6-1.3-1.4c0-0.7,0.6-1.3,1.4-1.3 c0.7,0,1.3,0.6,1.3,1.3 C5.9,5.3,5.3,5.9,4.6,5.8z',
				fillColor: '#f00',
				fillOpacity: 1,
				strokeColor: '#000',
				strokeWeight: 1,
				scale: 3.5,
			},
			opts
		);

	marker.setIcon(
		customIcon({
			fillColor: pos.urgent ? 'red' : 'green',
			strokeColor: 'white',
		})
	);
};

function OrderAll({ Greencaptainist, loading, setGreencaptainOne, districts, fetchMedicines }) {
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
	const handleEditMedicine = (captain) => {
		setGreencaptainOne(captain);
	};
	const user = JSON?.parse(localStorage?.getItem('user'));
	const handleDeleteMedicine = async (id) => {
		try {
			if (!window.confirm('Are you sure you want to delete this report?')) {
				return;
			}
			const response = await DELETE(`/order/${id}`);
			console.log(response);
			fetchMedicines();
		} catch (error) {
			console.log(error);
		}
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [showGreencaptainist, setShowGreencaptainist] = useState(false);
	const [GreencaptainistDetails, setGreencaptainistDetails] = useState([]);

	const handleViewDetails = (medicineId) => {
		
		const captain = Greencaptainist.find((captain) => captain.id === medicineId);
	
		setSelectedMedicine(captain);
		
		setShowModal(true);
	};

	const handleAcceptDetails = async (details) => {
		// console.log(medicineId);
		details.status = 2;
		delete details['image'];
		const response = await PUT('/order', details);
		console.log(response);

		fetchMedicines();
	};

	const handleRejectDetails = async (details) => {
		try {
			if (!window.confirm('Are you sure you want to reject this report?')) {
				return;
			}

			delete details['image'];
			details.status = 4;
			const response = await PUT('/order', details);
			fetchMedicines();
			// window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUrgent = async (details, isUrgent) => {
		try {
			if (!window.confirm('Are you sure you want to make this urgent?')) {
				return;
			}
			delete details['image'];
			details.urgent = isUrgent;
			const response = await PUT('/order', details);
			fetchMedicines();
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedMedicine(null);
		setShowGreencaptainist(false);
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleViewImage = (image) => {
		setSelectedImage(image);
		setModalOpen(true);
	};

	const getPosition = (value) => {
		console.log(value);
		return {
			lat: parseFloat(value.lat),
			lng: parseFloat(value.lng),
		};
	};

	const handleSubmit = async (order) => {
		try {
			console.log(order);
			//TODO: message: "Field 'createdUserId' doesn't have a default value"
			//TODO:

			//! convert to order items to string
			console.log(items);
			const user = JSON?.parse(localStorage?.getItem('user'));
			const data = {
				createdUserId: user.id,
				orderId: order.id,
				items: items,
				validTillDate,
			};
			console.log(data);

			const response = await POST('/bill', data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4"> All Reports</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className=" overflow-x-auto w-full md:w-auto">
					<table className="w-full text-sm text-left text-gray-500 " style={{ marginBottom: '20px' }}>
						<thead className="text-xs text-gray-700 uppercase bg-slate-400 ">
							<tr>
								<th className="px-4 py-2 border">Due Date</th>
								<th className="px-4 py-2 border">Note</th>
								<th className="px-4 py-2 border">District</th>
								<th className="px-4 py-2 border">Image</th>
								<th className="px-4 py-2 border">Actions</th>
								{user?.role === 2 && <th className="px-4 py-2 border">Status</th>}
							</tr>
						</thead>
						<tbody>
							{Greencaptainist ? (
								Greencaptainist.map((captain) => (
									<tr
										key={captain.id}
										className="bg-white border-b dark:bg-slate-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50"
									>
										<td className="px-4 py-2 border">
											{captain?.dueDate
												? new Date(captain?.dueDate).toLocaleDateString()
												: 'N/A'}
										</td>
										<td className="px-4 py-2 border">
											{captain?.notes ? captain?.notes : 'N/A'}
										</td>

										<td className="px-4 py-2 border">
											{captain?.district
												? districts.find((d) => d.id === captain?.district).name
												: 'N/A'}
										</td>
										<td className="px-4 py-2 border">
											<img
												src={`data:image/png;base64,${captain?.image || ''}`}
												alt="captain"
												className="w-[100px] h-[100px] rounded cursor-pointer"
												onClick={() => handleViewImage(captain?.image)}
											/>
											<div
												className={`fixed z-10 inset-0 overflow-y-auto ${
													modalOpen ? 'block' : 'hidden'
												}`}
											>
												<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
													<div
														className="fixed inset-0 transition-opacity"
														aria-hidden="true"
													>
														<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
													</div>

													<span
														className="hidden sm:inline-block sm:align-middle sm:h-screen"
														aria-hidden="true"
													>
														&#8203;
													</span>

													<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
														<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
															<img
																src={`data:image/png;base64,${selectedImage || ''}`}
																alt="captain"
																className="w-full rounded"
															/>
														</div>
														<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
															<button
																type="button"
																className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
																onClick={() => setModalOpen(false)}
															>
																Close
															</button>
														</div>
													</div>
												</div>
											</div>
										</td>

										<td className="px-4 py-2 border">
											<div className="flex justify-center space-x-8">
												{user?.role === 1 && (
													<button
														className="text-blue-500 hover:text-blue-700"
														onClick={() => handleAcceptDetails(captain)}
													>
														<i className="fa-solid  fa-check"></i>
													</button>
												)}

												{user?.role === 2 && (
													<button
														className="text-green-500 hover:text-green-700"
														onClick={() => handleEditMedicine(captain)}
													>
														<i className="fa-solid fa-pen-to-square"></i>
													</button>
												)}

												{[0, 2].includes(user?.role) && (
													<button
														className="text-red-500 hover:text-red-700"
														onClick={() => handleDeleteMedicine(captain.id)}
													>
														<i className="fa-sharp fa-solid fa-trash"></i>
													</button>
												)}
												{user?.role === 1 && (
													<button
														className="text-red-500 hover:text-red-700"
														onClick={() => handleRejectDetails(captain)}
													>
														<i className="fa-sharp fa-solid fa-times"></i>
													</button>
												)}

												{user?.role === 1 && (
													<button
														className="text-blue-500 hover:text-blue-700"
														onClick={() => handleUrgent(captain, !captain.urgent)}
													>
														<i
															className={
																captain.urgent
																	? 'fa-solid  fa-bell-slash'
																	: 'fa-solid  fa-bell'
															}
														></i>
													</button>
												)}
											</div>
										</td>
										{user?.role === 2 && (
											<td>
												{captain?.status === 4 && (
													<i className="fa-solid text-red-500 hover:text-red-700 px-4 py2   fa-times"></i>
												)}
												{captain?.status === 2 && (
													<i className="fa-solid text-green-500 hover:text-green-700 px-4 py-2   fa-check"></i>
												)}
												{captain?.status === 1 && (
													<i className="fa-solid text-blue-500 hover:text-blue-700 px-4 py-2   fa-spinner "></i>
												)}
											</td>
										)}
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="text-center">
										No data found
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{showModal && (
						<div className="fixed z-10 inset-0 overflow-y-auto">
							<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
								<div className="fixed inset-0 transition-opacity">
									<div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
								</div>
								<span
									className="hidden sm:inline-block sm:align-middle sm:h-screen"
									aria-hidden="true"
								></span>
								<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
									<div>
										<h3 className="text-lg leading-6 font-medium text-gray-900">Report Details</h3>
										<button
											className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150 p-2 w-10 h-10"
											onClick={closeModal}
										>
											<i className="fa-solid fa-times"></i>
										</button>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Here are the details for the selected report.
											</p>
											{selectedMedicine && (
												<>
													<div className="flex flex-col md:flex-row">
														<div className="mt-4 space-y-2">
															<p>
																<span className="font-medium">Date:</span>{' '}
																{selectedMedicine?.dueDate
																	? new Date(
																			selectedMedicine?.dueDate
																	  ).toLocaleDateString()
																	: 'N/A'}
															</p>
															<p>
																<span className="font-medium">Note:</span>{' '}
																{selectedMedicine?.notes
																	? selectedMedicine?.notes
																	: 'N/A'}
															</p>
															<p>
																<span className="font-medium">District :</span>{' '}
																{selectedMedicine?.district
																	? districts.find(
																			(d) => d.id === selectedMedicine?.district
																	  ).name
																	: 'N/A'}
															</p>
															<p>
																<span className="font-medium">Image</span>{' '}
																<img
																	src={`data:image/png;base64,${
																		selectedMedicine?.image || ''
																	}`}
																	alt="captain"
																	className="w-full h-full rounded mt-3"
																/>
															</p>
														</div>
														<div>
															<div className="w-full flex flex-col gap-5 mt-5 md:mt-0  md:mr-10 md:ml-2">
																{/* <button
																	type="submit"
																	className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
																	onClick={() => handleSubmit(selectedMedicine)}
																	>
																	Submit
																	</button> */}

																<div>
																	<label
																		htmlFor="image"
																		className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																	>
																		validTillDate
																	</label>
																	<input
																		type="date"
																		className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
																		value={validTillDate}
																		onChange={(e) =>
																			setValidTillDate(e.target.value)
																		}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="form">
														<form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
															<div className="mb-4">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="username"
																>
																	Medicine
																</label>
																<select
																	name="medicine"
																	value={selectedItem}
																	onChange={(e) => handleItemChange(e)}
																	className="py-2 px-3 rounded-lg border-gray-300 focus:outline-none w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
																>
																	<option value="">Select Medicine</option>
																	{medicines.map((medicine) => (
																		<option key={medicine.id} value={medicine.id}>
																			{medicine.name}
																		</option>
																	))}
																</select>
															</div>
															<div className="mb-6">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="quantity"
																>
																	Quantity
																</label>

																<input
																	type="number"
																	name="quantity"
																	value={quantity}
																	onChange={(e) => handleItemQuantityChange(e)}
																	className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																/>
															</div>
															<div className="mb-6">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="unitprice"
																>
																	Unit Price
																</label>

																<input
																	type="number"
																	name="unitprice"
																	value={unitPrice}
																	className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																	disabled={true}
																/>
															</div>
															<div className="mb-6">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="price"
																>
																	Price
																</label>

																<input
																	type="number"
																	name="price"
																	value={price}
																	className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																	disabled={true}
																/>
															</div>
															<div className="flex items-center justify-between">
																<button
																	className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
																	type="button"
																	onClick={() => handleAddItem()}
																>
																	Add
																</button>
															</div>
														</form>

														<table className="table-auto">
															<thead>
																<tr>
																	<th>Medicine</th>
																	<th>Unit Price</th>
																	<th>Total</th>
																</tr>
															</thead>
															<tbody>
																{items.map((item, index) => {
																	return (
																		<tr key={index}>
																			<td>{item.name}</td>
																			<td>{item.unitPrice}</td>
																			<td>{item.quantity}</td>
																			<td>
																				{' '}
																				<button
																					type="button"
																					onClick={() =>
																						handleRemoveItem(index)
																					}
																					className="py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
																				>
																					-
																				</button>
																			</td>
																		</tr>
																	);
																})}
															</tbody>
														</table>
														<button
															type="submit"
															className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
															onClick={() => handleSubmit(selectedMedicine)}
														>
															Submit
														</button>
													</div>
												</>
											)}
											\
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					<div style={{ margintop: '20px' }}>
						{user?.role === 1 && (
							<div
								style={{
									height: '100%',
									width: '100%',
								}}
							>
								<GoogleMap
									mapContainerStyle={containerStyle}
									center={center}
									zoom={9.99999}
									onLoad={onLoad}
									onUnmount={onUnmount}
								>
									{Greencaptainist ? (
										Greencaptainist.map((pos, index) => (
											<Marker
												key={pos.id}
												onLoad={(marker) => onLoading(marker, pos)}
												position={getPosition(pos)}
												label={pos.urgent ? 'urgent' : ''}
											></Marker>
										))
									) : (
										<div></div>
									)}

									<></>
								</GoogleMap>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
export default OrderAll;
