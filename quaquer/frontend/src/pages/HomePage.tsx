import React, { useEffect, useState } from 'react';


interface IAuthor {
    _id: string,
    username:string
}

interface IDataItem {
  _id: string;
  content: string;
  author:IAuthor
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/quacks');
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <div>{item.content}</div>
            <div>{item.author.username}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

