class State {
    constructor() {
        this.regs = new Array(32).fill(0);
        this.flags = {"n": false, "z": false, "c": false, "v":false}
    }

    setFlags(val) {
        this.flags.z = (val == 0);
        this.flags.n = (val < 0);
    }

    execute(mode, inst, r1, r2, r3) {
        switch (mode) {
            case Mode.i: this.regs[r1] = instSet[inst](this.regs[r1], r2); break;
            case Mode.s: this.regs[r1] = instSet[inst](this.regs[r2], this.regs[r3]); this.setFlags(this.regs[r1]); break;
            case Mode.is: this.regs[r1] = instSet[inst](this.regs[r1], r2); this.setFlags(this.regs[r1]); break;
            case Mode.d: this.regs[r1] = r2; break;
            default: this.regs[r1] = instSet[inst](this.regs[r2], this.regs[r3]); break;
        }

        return this.regs;
    }
    
    eval(command) {
        const tok = command.split(" ");

        let mode = Mode.e;

        if (tok[0].endsWith("is")) { mode = Mode.is; tok[0] = tok[0].slice(0, 3) }
        else if (tok[0].endsWith("i")) { mode = Mode.i; tok[0] = tok[0].slice(0, 3) }
        else if (tok[0].endsWith("s")) { mode = Mode.s; tok[0] = tok[0].slice(0, 3) }
        else if (tok[0] == "movz") { mode = Mode.d }

        return this.execute(mode, tok[0], parseInt(tok[1]), parseInt(tok[2]), parseInt(tok[3]));
        //  
    }
}

const Mode = 
    {
        "e": "Extended Register",
        "i": "Immediate",
        "s": "Set Flags",
        "is": "Immediate and Set Flags",
        "d": "Direct"
    }

const instSet = 
    {
        "add": (x,y) => (x + y),
        "sub": (x,y) => (x - y),
        "mul": (x,y) => (x * y),
        "and": (x,y) => (x & y),
        "eor": (x,y) => (x ^ y),
        "orr": (x,y) => (x | y),
        "lsl": (x,y) => (x << y),
        "lsr": (x,y) => (x >> y),
        "movz": (x) => (x)
    }

const state = new State()