import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3em;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
`;

const OverViewWrapper = styled.div``;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.overViewColor};
  padding: 15px;
  border-radius: 15px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const OverViewTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
`;

const OverViewValue = styled.span`
  font-size: 1rem;
`;

const Description = styled.div`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:price_id/price");
  const chartMatch = useMatch("/:price_id/chart");

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <OverViewWrapper>
          <OverView>
            <OverViewItem>
              <OverViewTitle>랭킹</OverViewTitle>
              <OverViewValue>{info?.rank}위</OverViewValue>
            </OverViewItem>
            <OverViewItem>
              <OverViewTitle>심볼</OverViewTitle>
              <OverViewValue>{info?.symbol}</OverViewValue>
            </OverViewItem>
            <OverViewItem>
              <OverViewTitle>오픈소스</OverViewTitle>
              <OverViewValue>{info?.open_source ? "Yes" : "No"}</OverViewValue>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <OverViewTitle>총 발행량</OverViewTitle>
              <OverViewValue>{priceInfo?.total_supply}개</OverViewValue>
            </OverViewItem>
            <OverViewItem>
              <OverViewTitle>최대 발행량</OverViewTitle>
              <OverViewValue>
                {priceInfo?.max_supply
                  ? `${priceInfo?.max_supply}개`
                  : "무제한"}
              </OverViewValue>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes>
        </OverViewWrapper>
      )}
    </Container>
  );
};

export default Coin;
