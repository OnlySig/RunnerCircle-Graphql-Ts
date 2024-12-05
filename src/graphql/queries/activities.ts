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

export const GET_ACTIVITIES_BY_USER = gql`
  query GetActivitiesByUser($user: String!) {
    mockActivities(user: $user) {
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

export const ADD_ACTIVITY = gql`
  mutation AddActivity(
    $time: String!
    $type: String!
    $distance: String!
    $calories: String!
    $bpm: String!
    $user: String!
    $userImage: String!
    $imageUrl: String!
  ) {
    addActivity(
      time: $time
      type: $type
      distance: $distance
      calories: $calories
      bpm: $bpm
      user: $user
      userImage: $userImage
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;
