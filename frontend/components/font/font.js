const Font = ({ children, color }) => {
    const fontcss= 'font-["Jalnan"] text-2xl mt-10 ' + color;
    return (
        <div className={fontcss}>{children}</div>
    );
};

export default Font;