

function AboutPage() {
    return (
        <div>
            <h1>
                About us
            </h1>
            <div class="flex">
                {Person({name:"ebbe",age:"4",profession:"datamatiker",description:"The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues..."})}
                {Person({name:"simon",age:"5",profession:"datamatiker",description:"No cock like horse cock."})}
                {Person({name:"seb",age:"1",profession:"datamatiker",description:"Any female born after 1983 can't cook, all they know is McDonalds, charge their phone, twerk, be bisexual, eat hot chip and lie."})}

            </div>
        </div>
    )
}

function Person({name, age, profession, description}) {
    return (
        <div class="bg-blue-200 p-2 m-2 overflow-hidden rounded-xl shadow-md">
            <div class="font-bold">
                {name}, {age}
            </div>
            <div class="text-gray-700 italic">{profession}</div>
            <div>{description}</div>
        </div>
    )
}


export default AboutPage;