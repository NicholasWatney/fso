

const Header = (props) => { return <div>{ props.course.name }</div> }

const Content = (props) => {

    let total = 0;
    props.course.parts.map((part) => {
        total += part.exercises;
    })

    return (
        <div>
            {props.course.parts.map((part) => (
                <div key={part.id}>
                    <Part part={part}/>
                    <br />
                </div>
            ))}
            <div>
                <strong>total of {total} exercises</strong>
                <br />
                <br />
            </div>
       </div>
    );
};

const Part = (props) => {
    return (
        <div>{ props.part.name } { props.part.exercises } </div>
    );
};

const Course = (props) => {
    return(
        <div>
            {props.courses.map((course) => (
                <div>
                    <Header course={course} />
                    <br />
                    <Content course={course} />
                </div>
            ))}
        </div>
    );
};

export default Course;