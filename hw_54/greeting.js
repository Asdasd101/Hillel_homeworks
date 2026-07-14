function getUserGreeting () {
    const name = process.argv[2];
    if (name) {
        return `Hello, ${name}`;
    } else {
        return 'Hello, Guest';
    }
};

export { getUserGreeting }