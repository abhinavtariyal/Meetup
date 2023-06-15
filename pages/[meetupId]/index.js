import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://abhinav:u5MjKYvZmCHFdq86@cluster0.co8lld8.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log(meetups);
  client.close();
  return {
    fallback: false,
    paths: (await meetups).map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://abhinav:u5MjKYvZmCHFdq86@cluster0.co8lld8.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection
    .findOne({ _id: new ObjectId(meetupId) })
  client.close();
  return {
    props: {
      meetupData: {
        id:selectedMeetup._id.toString(),
        description:selectedMeetup.description,
        title:selectedMeetup.title,
        address:selectedMeetup.address,
        image:selectedMeetup.image
      },
    },
  };
}

export default MeetupDetails;
