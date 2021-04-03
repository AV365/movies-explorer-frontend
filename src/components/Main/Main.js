function Main(props) {
    const fullframeClass = props.fullframe ? " main_style_fullframe" : "";
    return (
        <>
            <main className={"main" + fullframeClass}>
                {props.children}
            </main>
            </>

    );

}

export default Main;
