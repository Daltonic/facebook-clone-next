import StoryCard from './StoryCard'
const stories = [
  {
    name: 'Darlington Gospel',
    src: 'https://firebasestorage.googleapis.com/v0/b/facebook-clone-dff86.appspot.com/o/stories%2FFB_IMG_1577470324531.jpg?alt=media&token=8d2e6d98-b782-46f1-8f61-9d349a301402',
    profile:
      'https://firebasestorage.googleapis.com/v0/b/facebook-clone-dff86.appspot.com/o/stories%2FWhatsApp%20Image%202021-01-26%20at%2012.25.20%20PM.jpeg?alt=media&token=d3fe60ba-3e75-4748-9b4f-9b690c6f1426',
  },
  {
    name: 'Prathamesh Majgaonkar',
    src: 'https://firebasestorage.googleapis.com/v0/b/facebook-clone-dff86.appspot.com/o/stories%2F616323b2efd2d885ec96ecebf315c93e.jpg?alt=media&token=cd57cd3e-8b31-4130-bf4d-5708dc2f8cec',
    profile:
      'https://lh3.googleusercontent.com/a-/AOh14Gi1b7LJFStKT5Dhg9BLdD23mBHn7FRuSN3GmgjS=s96-c',
  },
  {
    name: 'Priyanka Gurnani',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSG7YOxamQs3xieRhKzsKmvMA-POW3lKkkLj99Vtq6RiUdNlqm5GrEAlH13Rsl7bBuGmI&usqp=CAU',
    profile:
      'https://ca.slack-edge.com/T0108EA6BH8-U012VFXD21W-7aad7d857106-512',
  },
  {
    name: 'Ajay Gajra',
    src: 'https://i.pinimg.com/originals/2e/c2/5b/2ec25b60d1a40bd9c0e883c527146aa7.jpg',
    profile:
      'https://ca.slack-edge.com/T0108EA6BH8-U012ZT1VAJV-b965eba64db9-512',
  },
  {
    name: 'Priyadarshini Nadar',
    src: 'https://media.nature.com/lw800/magazine-assets/d41586-021-00075-2/d41586-021-00075-2_18790032.jpg',
    profile: 'https://ca.slack-edge.com/T0108EA6BH8-U01EZCVTSD9-ba7fa5e960b3-512',
  },
]

function Stories() {
  return (
    <div className="stories flex items-center justify-center space-x-3 mx-auto">
      {stories.map((story, index) => (
        <StoryCard
          profile={story.profile}
          src={story.src}
          name={story.name}
          key={index}
        />
      ))}
    </div>
  )
}

export default Stories
