function Layout(props) {
    const { title, children } = props
    return (
        <div>
            <h1>{title}</h1>
            <div>{children}</div>
        </div>
    )
}

export default Layout