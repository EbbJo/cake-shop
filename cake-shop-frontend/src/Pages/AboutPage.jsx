

function AboutPage() {//sx:columns-1 sx:gap-2 sm:columns-2 sm:gap-4 md:columns-3 md:gap-6 m-4
    return (
        <div>
            <div class="m-4">
                <h1 class="text-xl  font-bold mb-0">
                    About us
                </h1>
                <div class="mb-4 text-[17px]/6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
            <div class="md:flex">
                {Person({ name: "Ebbe Johansen", age: "4", profession: "datamatiker", imgSrc: "https://placehold.co/200x150", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." })}
                {Person({ name: "Simon Knudsen", age: "5", profession: "datamatiker", imgSrc: "https://placehold.co/200x200", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." })}
                {Person({ name: "Sebastian Maul", age: "22", profession: "datamatiker", imgSrc: "https://placehold.co/200x150", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." })}

            </div>
        </div>
    )
}

function Person({ name, age, profession, imgSrc, description }) {
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


export default AboutPage;