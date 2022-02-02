import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COINS_API, COIN_IMG } from "../Routes";

interface CoinInfomation {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [loading, setLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState<CoinInfomation[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(COINS_API);
      const coinsData = await response.json();
      setCoins(coinsData.slice(0, 100));
      setLoading(false);
    };
    fetchCoins();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>;
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`${COIN_IMG}${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #fff;
  color: ${({ theme }) => theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2 ease-in;
  }
  &:hover {
    a {
      color: ${({ theme }) => theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.accentColor};
  font-size: 48px;
`;

const Loading = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default Coins;
