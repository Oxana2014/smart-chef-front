import "./Answer.css"

const Answer = ({answer, concepts}) => {
 
    if(answer === "no") {
        return ""
    }
    else if(answer === "success" && concepts && concepts.length > 0) {
        const products = concepts.map(obj => obj.name);
return (
    <div className="answer-card mv3 br3 ba bw1  pv2 mb2 dib white shadow-2">
        <p className="f3 white db purple">My Answer is:</p>
        <img className=" answer dib" src="/images/3d6f09064f6617fadd668164cd14d948.png" alt="" />
      <div className="answer-text dib w-50 mh3">
        <p className="sure f5 link dim br3 ba bw2 ph3 pv2 mb2 dib bg-white purple">
I am sure  there are <span className="f4 "> {products[0]}, {products[1]}, {products[2]}, {products[3]} and {products[4]}</span> here.
        </p>
        <p className="less-sure f5 link dim br3 ph3 pv2 mb2 dib white bg-purple">
It seems to me there are <span className="f4"> {products[5]}, {products[6]}, {products[7]}, {products[8]} and {products[4]}</span> here too.
        </p>
      
        </div>
          <h2 className=" bon-appetit f1 purple db"> Bon Appetit!</h2>
    </div>
)
    }
    else if( answer === "fail" || !concepts || !concepts.length) {
        return (
            <div>
                <img src="images/download-chef-clip-art-free-clipart-of-chefs-cooks-cooking-338968.png" alt=""/>
           <p>Oh boy! I can't find food here! Are you sure it's there?</p>
            </div>
        )
    }
    else if (answer === "error") {
        return (
        <div>
        <img src="images/sleeping.jpg" alt="" />
        <p>Something get wrong with connection or may be I'm just sleeping now</p>
        </div>
        )
    }
}

export default Answer;