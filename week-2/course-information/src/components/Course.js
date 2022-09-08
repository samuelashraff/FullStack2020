import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    const parts = course.parts
    const total = parts.reduce((acc, part) => {
        return acc + part.exercises
    }, 0)

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total total={total} />
        </div>
    )
}

export default Course