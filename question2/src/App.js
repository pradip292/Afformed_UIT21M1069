import {useEffect, useState} from "react";
import UserData from "./components/UserData.jsx";

const API = "https://mock_e9de1d5300da4ee2ac3fe7cd4c029f25.mock.insomnia.rest/data1";

const App = () => {
    const [users, setUsers] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    const fetchUsers = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                setUsers(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
        setShowSortOptions(false);
    };

    const sortIcon = (key) => {
        if (sortKey === key) {
            return sortOrder === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchUsers(API);
    }, []);

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">
                            Previous
                        </button>
                    </li>
                )}
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < Math.ceil(users.length / usersPerPage) && (
                    <li className="page-item">
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">
                            Next
                        </button>
                    </li>
                )}
            </ul>
        );
    };
    
    
    return (
        <>
            <h1>Tables</h1>
            <div className="sort-container">
                <button className="sort-button" onClick={() => setShowSortOptions(!showSortOptions)}>
                    Sort By
                </button>
                {showSortOptions && (
                    <div className="sort-options">
                        <button onClick={() => handleSort('id')}>ID {sortIcon('id')}</button>
                        <button onClick={() => handleSort('productName')}>Product Name {sortIcon('productName')}</button>
                        <button onClick={() => handleSort('price')}>Price {sortIcon('price')}</button>
                        <button onClick={() => handleSort('rating')}>Rating {sortIcon('rating')}</button>
                        <button onClick={() => handleSort('discount')}>Discount {sortIcon('discount')}</button>
                        <button onClick={() => handleSort('availability')}>Availability {sortIcon('availability')}</button>
                    </div>
                )}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Discount</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    <UserData users={currentUsers} sortKey={sortKey} sortOrder={sortOrder} />
                </tbody>
            </table>
            {renderPagination()}
        </>
    );
};


export default App;

