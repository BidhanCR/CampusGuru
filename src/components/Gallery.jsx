import PhotoAlbum from "react-photo-album";
const photos = [
  {
    src: "https://i.ibb.co/7nRw2yJ/happy-friends-gratuating-23-2148522250.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://i.ibb.co/kgV8f8X/graduation-concept-with-students-holding-blank-certificate-template-23-2148201847.jpg",
    width: 1600,
    height: 900,
  },
  {
    src: "https://i.ibb.co/hZGJnH8/portrait-three-smiling-graduate-friends-graduation-robes-university-campus-with-diploma-496169-1363.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://i.ibb.co/m60P3zL/group-colleagues-with-diploma-23-2148522297.jpg",
    width: 1600,
    height: 900,
  },
  {
    src: "https://i.ibb.co/Nn1f3Xh/portrait-group-students-celebrating-their-graduation-23-2148201832.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://i.ibb.co/nMknP56/students-university-people-wearing-mantles-group-students-115086-788.jpg",
    width: 1600,
    height: 900,
  },
  {
    src: "https://i.ibb.co/Nn1f3Xh/portrait-group-students-celebrating-their-graduation-23-2148201832.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://i.ibb.co/nMknP56/students-university-people-wearing-mantles-group-students-115086-788.jpg",
    width: 1600,
    height: 900,
  },
  {
    src: "https://i.ibb.co/jH2mJY6/portrait-group-students-celebrating-their-graduation-23-2148201866.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://i.ibb.co/nMknP56/students-university-people-wearing-mantles-group-students-115086-788.jpg",
    width: 1600,
    height: 900,
  },
  {
    src: "https://i.ibb.co/jH2mJY6/portrait-group-students-celebrating-their-graduation-23-2148201866.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://i.ibb.co/SP24y7f/boys-girls-graduation-23-2148522223.jpg",
    width: 1600,
    height: 900,
  },
  
];
const Gallery = () => {
  return (
    <>
      <PhotoAlbum layout="columns" photos={photos} />
    </>
  );
};

export default Gallery;
