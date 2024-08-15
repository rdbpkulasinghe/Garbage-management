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

function ArticleForm({ fetchArticles, article }) {

	const user = JSON.parse(localStorage.getItem('user'));

	const [createdUserId, setCreatedUserId] = useState(user.id);
	const [notes, setNotes] = useState('');
	const [image, setImage] = useState('');
    const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (Object.keys(article).length !== 0) {
			setNotes(article.notes);
			setIsShow(true);
		} else {
			setNotes('');
			setImage('');
			setIsShow(false);
		}
	}, [article]);

	const handleSubmit = async () => {
		try {
			if (!notes || !image) {
				alert('Please fill all fields');
				return;
			}

			const formData = new FormData();
			formData.append('createdUserId', createdUserId);
			formData.append('notes', notes);
			formData.append('image', image);

			console.log(formData);

			const response = await POST('/article', formData);
			console.log(response);
			fetchArticles();
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (!notes || !image) {
				alert('Please fill all fields');
				return;
			}

			const formData = new FormData();
			formData.append('id', article.id);
			formData.append('createdUserId', createdUserId);
			formData.append('notes', notes);
			formData.append('image', image);

			const response = await PUT('/article', formData);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setNotes('');
		setImage('');
		setIsShow(false);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4">Add Article</h1>
			<div className="w-full ">

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

export default ArticleForm;
