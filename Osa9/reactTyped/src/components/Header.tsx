interface courseNameType {
    name: string;
}

const Header = (props: courseNameType) => {
    return <h1>{props.name}</h1>;
}

export default Header;