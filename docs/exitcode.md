Health Check and Graceful Crash

Exit codes Description
Exit Code 0 It will let the Node.js know to terminate the process when no async operations are performing. Without mentioning, it will take the default value of 0.
Exit Code 1 It is useful in case of fatal exceptions not handled by the domain. It is an efficient method to terminate the process.
Exit Code 2 Bash uses it for misuse.
Exit Code 3 You can use this exit code for the development where internal code cannot be parsed properly.
Exit Code 4 It is also used in the case of development where the JavaScript code fails to return the function value.
Exit Code 5 It is useful for fatal errors, such as the V8 engine cannot recover.
Exit code 6 It is useful when an internal fatal exception handler function is set to a non-function and cannot be called.
Exit code 7 Useful when an error is thrown while handling an uncaught expectation.
Exit Code 8 Unused, in easier versions, it specifies the uncaught exceptions.
Exit Code 9 It is when an extra value is provided for a non-required parameter, or we do not provide the value for a required parameter.
Exit Code 10 The JavaScript code in bootstrapping of Node.js throws an error while calling the bootstrap.
Exit Code 12 When you chose the wrong port number within the process.
Exit Code 13 It is useful when await is outside the function in the top-level code, but the passed Promise was never resolved.

> 128 Used for fatal signals such as SIGKILL or SIGHU.P

Name Number Handleable Signal Purpose
SIGHUP 1 Yes To close the parent terminal.
SIGINT 2 Yes To interrupt a terminal, à la Ctrl + C
SIGQUIT 3 Yes To make the terminal quit, à la Ctrl + D
SIGKILL 9 No To forceful kill the process
SIGUSR1 10 Yes User-defined signal 1
SIGUSR2 12 Yes User-defined signal 2
SIGTERM 12 Yes Represents a smooth process termination
SIGSTOP 19 No
