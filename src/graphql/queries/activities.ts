import { gql } from "@apollo/client";

export const GET_ACTIVITIES = gql`
  query GetActivities {
    mockActivities {
      id
      time
      type
      distance
      calories
      bpm
      user
      userImage
      imageUrl
    }
  }
`;
