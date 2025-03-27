

function AboutPage() {
    return (
        <div>
            <div class="m-4">
                <h1 class="text-xl  font-bold mb-0">
                    About us
                </h1>
                <div class="mb-4 text-[17px]/6">
                    {ParagraphsToHTML({
                        paragraphs: [
                            "Welcome to [Your Cake Shop Name], where every bite tells a story! Our passion for baking started with a simple love for sweet treats and has grown into a commitment to crafting delicious, handmade cakes for every occasion.",
                            "From classic flavors to custom creations, we use only the finest ingredients to ensure every cake is as delightful as it is beautiful. Whether you're celebrating a birthday, wedding, or just indulging in something sweet, we're here to make your moments extra special.",
                            "Visit us today and taste the love in every slice!"
                        ]
                    })}
                </div>
            </div>
            <div class="md:flex">
                {PersonCard({ 
                    name: "Ebbe Johansen", 
                    age: "4", 
                    profession: "datamatiker", 
                    imgSrc: "https://placehold.co/200x150", 
                    description: "With a passion for baking and years of experience in the industry, Samantha brings creativity and precision to every cake she designs. From elegant wedding cakes to fun birthday creations, she ensures every bite is as delightful as it looks!"
                    })}
                {PersonCard({ 
                    name: "Simon Knudsen", 
                    age: "5", 
                    profession: "datamatiker", 
                    imgSrc: "https://placehold.co/200x200", 
                    description: "James is the friendly face that greets you when you walk into our shop! Whether helping you choose the perfect cake or answering your questions, he’s dedicated to making your experience at [Cake Shop Name] as sweet as our treats." 
                    })}
                {PersonCard({ 
                    name: "Sebastian Maul", 
                    age: "22", 
                    profession: "datamatiker", 
                    imgSrc: "https://placehold.co/200x150", 
                    description: ParagraphsToHTML({paragraphs: ["Test", "Er", "Det", "Jeg", "Gør"]}) 
                    })}

            </div>
        </div>
    )
}

/**
 * A functional React component that displays a card with a person's details.
 *
 * @param {*} name - The person's name.
 * @param {*} age - The person's age.
 * @param {*} profession - The person's profession.
 * @param {*} imgSrc - The URL of the person's image.
 * @param {*} description - A short description of the person.
 * @returns {JSX.Element} A styled card displaying the person's information.
 */
function PersonCard({ name, age, profession, imgSrc, description }) {
    return (
        <div class="bg-amber-100 rounded-xl shadow-md p-3 min-h-100 m-4 md:flex-1">
            <img src={imgSrc} class="float-right rounded-xl ml-2 mb-2 md:scale-100 scale-120" alt={name} />
            <div class="text-xl  font-bold mb-0 flex-none">
                {name}, {age}
            </div>
            <div class="text-gray-600 italic mb-2 text-lg">{profession}</div>
            <div class="mb-4 text-[17px]/6">{description}</div>
        </div>
    )
}

/**
 * A functional React component that converts an array of paragraphs into HTML div elements.
 *
 * @param {string[]} paragraphs - An array of paragraph strings to be displayed.
 * @returns {JSX.Element} A container div with each paragraph wrapped inside a separate div.
 */
function ParagraphsToHTML({ paragraphs }) {
    return (
        <div>
            {paragraphs.map((paragraph) => {
                return (
                    <div>
                        {paragraph}
                    </div>
                )
            })}
        </div>
    );
}


export default AboutPage;