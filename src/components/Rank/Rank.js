const Rank = ({name, entries}) => {
return (
    <div>
        <div className="white f3">
{`${name}, you already called me... `}
        </div>
        <div className="white f1">
{` ${entries}  times `}
        </div>
        <p  className="white f3">I'm so smart and I'm waiting for your picture!</p>
    </div>
)
}

export default Rank;