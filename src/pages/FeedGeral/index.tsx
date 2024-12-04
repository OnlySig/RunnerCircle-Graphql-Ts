import { Box, CssBaseline, Grid } from "@mui/material";
import { SearchField, FeedContainer } from "./styles";
import { ActivityCard, Activity } from "../../components/ActivityCard";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITIES } from "../../graphql/queries/activities";

export function FeedGeral() {
  const { data, loading, error } = useQuery(GET_ACTIVITIES);
  if (error) return <h1>deu um erro zuadão ae :)</h1>;
  return loading ? (
    <h1>carregando...</h1>
  ) : (
    <Box flex="1">
      <CssBaseline />
      <SearchField
        fullWidth
        placeholder="O que você procura?"
        variant="outlined"
      />
      <FeedContainer maxWidth="lg">
        <Grid container spacing={3}>
          {data?.mockActivities.map((activity: Activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <ActivityCard activity={activity} />
            </Grid>
          ))}
        </Grid>
      </FeedContainer>
    </Box>
  );
}
