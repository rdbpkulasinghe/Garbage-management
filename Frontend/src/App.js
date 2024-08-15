import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInSide from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import NavBar from './Components/Navigation/NavBar';
import Greencaptain from './Pages/Greencaptain/Greencaptain';
import Registration from './Pages/Login/Registration';
import GTFmember from './Pages/GTFmember/GTFmember';
import Article from './Pages/Article/Article';


function App() {
	const user = JSON?.parse(localStorage?.getItem('user'));
	return (
		<BrowserRouter>
			{localStorage.getItem('token') && <NavBar />}
			<Routes>
				<Route path="/Registration" element={<Registration />} />
				{!localStorage.getItem('token') && <Route path="/" element={<SignInSide />} />}
				{localStorage.getItem('token') && (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/Greencaptain" element={<Greencaptain />} />
						<Route path="/Article" element={<Article/>} />
						<Route path="/GTFmember" element={<GTFmember/>} />

					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
