import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
import Navigation from '../Navigation/Navigation'; // Assuming this is your navigation component

const API_KEY = 'fLcjLx55MrFpq6sMU2AneElyk1oRwWAdhrh5OmVT'; // Replace with your key
const MARKET_NEWS_URL = `https://api.marketaux.com/v1/news/all?api_token=${API_KEY}&language=en&filter_entities=true&limit=10`;

const StockNews = () => {
  const [news, setNews] = useState([]);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(MARKET_NEWS_URL);
        setNews(res.data.data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };
    fetchNews();
  }, []);

  return (
    <PageWrapper>
      <NavigationWrapper>
        <Navigation active={active} setActive={setActive} />
      </NavigationWrapper>
      <NewsSection>
        <BackButton onClick={() => navigate('/dashboard')}>⬅ Back</BackButton> {/* Back button */}
        <h2>📈 Latest Stock News</h2>
        <NewsWrapper>
          {news.map((item) => (
            <NewsCard key={item.uuid}>
              <h3>{item.title}</h3>
              <p>{item.description?.slice(0, 100)}...</p>
              <a href={item.url} target="_blank" rel="noreferrer">Read More</a>
            </NewsCard>
          ))}
        </NewsWrapper>
      </NewsSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #f4f4f9;
`;

const NavigationWrapper = styled.div`
  width: 250px;  /* Adjusted to the 250px width */
  background-color: #2c3e50;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const NewsSection = styled.div`
  margin-left: 250px;  /* Adjusted to the new width of navigation */
  padding: 2rem;
  width: calc(100% - 250px);  /* Adjusted to match the width of navigation */
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ff4500;
  }
`;

const NewsWrapper = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NewsCard = styled.div`
  background: white;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }

  a {
    margin-top: 0.5rem;
    display: inline-block;
    color: #1e90ff;
    font-weight: bold;
  }
`;

export default StockNews;
