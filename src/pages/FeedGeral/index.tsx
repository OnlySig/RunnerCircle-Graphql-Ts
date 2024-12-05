import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
} from "@mui/material";
import { SearchField, FeedContainer } from "./styles";
import { ActivityCard, Activity } from "../../components/ActivityCard";
import { useQuery } from "@apollo/client";
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_BY_USER,
} from "../../graphql/queries/activities";
import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export function FeedGeral() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const query = user ? GET_ACTIVITIES_BY_USER : GET_ACTIVITIES;
  const { data, loading, error } = useQuery(query, {
    variables: user ? { user } : undefined,
    skip: user ? !user : undefined,
  });
  if (error) return <h1>deu um erro zuadão ae :)</h1>;
  return loading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <Box flex="1">
      <CssBaseline />
      <StyledDiv>
        <SearchField
          placeholder="Digite o nome do usuário"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%" }}
        />
        <Button onClick={() => setUser(search.trim())} variant="outlined">
          Search
        </Button>
      </StyledDiv>
      <FeedContainer maxWidth="lg">
        <Grid container spacing={3}>
          {data.mockActivities.length ? (
            data?.mockActivities.map((activity: Activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <ActivityCard activity={activity} />
              </Grid>
            ))
          ) : (
            <h1>O nome pesquisado não existe!</h1>
          )}
        </Grid>
      </FeedContainer>
    </Box>
  );
}
