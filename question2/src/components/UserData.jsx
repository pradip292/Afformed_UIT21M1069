/*
const UserData = ({users}) => {
    return (
        <>
            {
                users.map((curUser) => {
                    const {id,productName,price,rating,discount,availability} = curUser;
                    //const {street, city, zipcode} = curUser.address;

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{productName}</td>
                            <td>{price}</td>
                            <td>{rating}</td>
                            <td>{discount}</td>
                            <td>{availability}</td>
                        </tr>
                    )
                })

            }
        </>
    )
}
export default UserData;

*/

const UserData = ({ users, sortKey, sortOrder }) => {
    const sortedUsers = [...users].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
            return a[sortKey] < b[sortKey] ? 1 : -1;
        }
    });

    return (
        <>
            {sortedUsers.map((curUser) => {
                const { id, productName, price, rating, discount, availability } = curUser;

                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{productName}</td>
                        <td>{price}</td>
                        <td>{rating}</td>
                        <td>{discount}</td>
                        <td>{availability}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default UserData;