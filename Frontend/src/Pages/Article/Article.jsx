import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import districtJson from '../Data/Data.json';
import ArticleForm from './widgets/ArticleForm';
import ArticleAll from './widgets/ArticleAll';

function Article() {
	const { districts } = districtJson;

	const [articles, setArticles] = useState([]);
	const [article, setArticle] = useState({}); 
	const [loading, setLoading] = useState(true);

	const user = JSON?.parse(localStorage?.getItem('user'));

	const fetchArticles = async () => {
		try {

			if (user?.role === 0) {
				const response = await GET('/article');
				setArticles(response.data);
				setLoading(false);
				return;
			}
		} catch (error) {if (!window.confirm(' Fill All The feilds ?')) {
			return;
		}
			console.log(error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	return (
		<div className="bg-cover bg-center bg-no-repeat h-full lg:h-screen bg-[#ffffff62]">
			<div className="flex flex-col-reverse lg:flex-row gap-4 p-10 justify-evenly">
			{user?.role === 0 && (
					<div>
						<ArticleForm fetchArticles={fetchArticles} article={article} />
					</div>
				)}
				<div>
					<ArticleAll
						articles={articles}
						loading={loading}
						setArticle={setArticle}
						fetchArticles={fetchArticles}
					/>
				</div>
			
			</div>
		</div>
	);
}

export default Article;