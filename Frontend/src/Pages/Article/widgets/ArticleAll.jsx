import React, { useEffect, useState } from 'react';
import { DELETE, GET, POST, PUT } from '../../../helpers/HttpHelper';

const containerStyle = {
	width: '800px',
	height: '400px',
};

function ArticleAll({ articles, loading, setArticle, fetchArticles }) {

	const handleEditArticle = (_article) => {
		setArticle(_article);
	};
	const user = JSON?.parse(localStorage?.getItem('user'));
	const handleDeleteArticle = async (id) => {
		try {
			if (!window.confirm('Are you sure you want to delete this article?')) {
				return;
			}
			const response = await DELETE(`/article/${id}`);
			fetchArticles();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4"> All Articles</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className=" overflow-x-auto w-full md:w-auto">
					<table className="w-full text-sm text-left text-gray-500 ">
						<thead className="text-xs text-gray-700 uppercase bg-slate-400 ">
							<tr>
								<th className="px-4 py-2 border">Note</th>
								<th className="px-4 py-2 border">Image</th>
								<th className="px-4 py-2 border">Actions</th>
							</tr>
						</thead>
						<tbody>
							{articles ? (
								articles.map((_article) => (
									<tr
										key={_article.id}
										className="bg-white border-b dark:bg-slate-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50"
									>
										<td className="px-4 py-2 border">
											{_article?.notes ? _article?.notes : 'N/A'}
										</td>
										<td className="px-4 py-2 border">
											<img
												src={`data:image/png;base64,${_article?.image || ''}`}
												alt="pharmacie"
												className="w-[100px] h-[100px] rounded cursor-pointer"
												onClick={() => {}}
											/>
										</td>

										<td className="px-4 py-2 border">
											<div className="flex justify-center space-x-8">

												{user?.role === 0 && (
													<button
														className="text-green-500 hover:text-green-700"
														onClick={() => handleEditArticle(_article)}
													>
														<i className="fa-solid fa-pen-to-square"></i>
													</button>
												)}

												{[0,2].includes(user?.role) && (
													<button
														className="text-red-500 hover:text-red-700"
														onClick={() => handleDeleteArticle(_article.id)}
													>
														<i className="fa-sharp fa-solid fa-trash"></i>
													</button>
												)}

											</div>
										</td>
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
				</div>
			)}
		</div>
	);
}
export default ArticleAll;
