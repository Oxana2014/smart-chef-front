import "./FoodImage.css"

const FoodImage = ({imageUrl}) => {
return (
    <div className="center mt3">
        <img src= {imageUrl}
         alt=""/>
    </div>
)
}
// "https://en.islcollective.com/preview/201711/f/a-job-advertisement_102467_1.jpg"
export default FoodImage;