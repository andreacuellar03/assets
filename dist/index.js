/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(41);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(327);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(327);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(981);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const uuid_1 = __nccwpck_require__(840);
const utils_1 = __nccwpck_require__(278);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(255);
const auth_1 = __nccwpck_require__(526);
const core_1 = __nccwpck_require__(186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 981:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(17));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 327:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(37);
const fs_1 = __nccwpck_require__(147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 526:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 255:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(685));
const https = __importStar(__nccwpck_require__(687));
const pm = __importStar(__nccwpck_require__(835));
const tunnel = __importStar(__nccwpck_require__(294));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 681:
/***/ ((module) => {

module.exports = flatten
flatten.flatten = flatten
flatten.unflatten = unflatten

function isBuffer (obj) {
  return obj &&
    obj.constructor &&
    (typeof obj.constructor.isBuffer === 'function') &&
    obj.constructor.isBuffer(obj)
}

function keyIdentity (key) {
  return key
}

function flatten (target, opts) {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const maxDepth = opts.maxDepth
  const transformKey = opts.transformKey || keyIdentity
  const output = {}

  function step (object, prev, currentDepth) {
    currentDepth = currentDepth || 1
    Object.keys(object).forEach(function (key) {
      const value = object[key]
      const isarray = opts.safe && Array.isArray(value)
      const type = Object.prototype.toString.call(value)
      const isbuffer = isBuffer(value)
      const isobject = (
        type === '[object Object]' ||
        type === '[object Array]'
      )

      const newKey = prev
        ? prev + delimiter + transformKey(key)
        : transformKey(key)

      if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}

function unflatten (target, opts) {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const overwrite = opts.overwrite || false
  const transformKey = opts.transformKey || keyIdentity
  const result = {}

  const isbuffer = isBuffer(target)
  if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
    return target
  }

  // safely ensure that the key is
  // an integer.
  function getkey (key) {
    const parsedKey = Number(key)

    return (
      isNaN(parsedKey) ||
      key.indexOf('.') !== -1 ||
      opts.object
    ) ? key
      : parsedKey
  }

  function addKeys (keyPrefix, recipient, target) {
    return Object.keys(target).reduce(function (result, key) {
      result[keyPrefix + delimiter + key] = target[key]

      return result
    }, recipient)
  }

  function isEmpty (val) {
    const type = Object.prototype.toString.call(val)
    const isArray = type === '[object Array]'
    const isObject = type === '[object Object]'

    if (!val) {
      return true
    } else if (isArray) {
      return !val.length
    } else if (isObject) {
      return !Object.keys(val).length
    }
  }

  target = Object.keys(target).reduce(function (result, key) {
    const type = Object.prototype.toString.call(target[key])
    const isObject = (type === '[object Object]' || type === '[object Array]')
    if (!isObject || isEmpty(target[key])) {
      result[key] = target[key]
      return result
    } else {
      return addKeys(
        key,
        result,
        flatten(target[key], opts)
      )
    }
  }, {})

  Object.keys(target).forEach(function (key) {
    const split = key.split(delimiter).map(transformKey)
    let key1 = getkey(split.shift())
    let key2 = getkey(split[0])
    let recipient = result

    while (key2 !== undefined) {
      if (key1 === '__proto__') {
        return
      }

      const type = Object.prototype.toString.call(recipient[key1])
      const isobject = (
        type === '[object Object]' ||
        type === '[object Array]'
      )

      // do not write over falsey, non-undefined values if overwrite is false
      if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
        return
      }

      if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
        recipient[key1] = (
          typeof key2 === 'number' &&
          !opts.object ? [] : {}
        )
      }

      recipient = recipient[key1]
      if (split.length > 0) {
        key1 = getkey(split.shift())
        key2 = getkey(split[0])
      }
    }

    // unflatten again for 'messy objects'
    recipient[key1] = unflatten(target[key], opts)
  })

  return result
}


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(628));

var _v2 = _interopRequireDefault(__nccwpck_require__(409));

var _v3 = _interopRequireDefault(__nccwpck_require__(122));

var _v4 = _interopRequireDefault(__nccwpck_require__(120));

var _nil = _interopRequireDefault(__nccwpck_require__(332));

var _version = _interopRequireDefault(__nccwpck_require__(595));

var _validate = _interopRequireDefault(__nccwpck_require__(900));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

var _parse = _interopRequireDefault(__nccwpck_require__(746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 569:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 332:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 814:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 807:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 274:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 950:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 628:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(998));

var _md = _interopRequireDefault(__nccwpck_require__(569));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 998:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

var _parse = _interopRequireDefault(__nccwpck_require__(746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 120:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(998));

var _sha = _interopRequireDefault(__nccwpck_require__(274));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(814));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 595:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"welcomeInfo":{"welcomeMessageHeading":"Bienvenido a Focus Bear","welcomeMessageIntro":"Cada mañana, evitaré que siga su impulso de revisar su correo electrónico/Facebook y le invitaré a seguir su rutina matutina en su lugar.\\nPuede configurar su propia rutina luego, pero por ahora te sugiero una actividad: 1 minuto de respiración consciente.\\nMientras respira profundamente, piense en lo increíble que serás si se compromete a su rutina matutina todos los días.","welcomeEndMessage":"Espero que se sienta más tranquilo. Ahora puede personalizar su rutina matutina haciendo clic en el ícono <icon> en la barra superior y seleccionando Preferencias -> Configuraciones.","preloadFocusModesDoneText":"Aquí podrás ver un video corto que explica cómo utilizar Focus Bear.","introActivities":[{"name":"Respiración Consciente","duration_seconds":30,"video_urls":["https://www.youtube.com/watch?v=HhMXYsk_Pvo"]}],"welcomeVideoUrl":"https://www.youtube.com/watch?v=TvfNJ1AaT9M","welcomeMessageOnlyBreakIntro":"A lo largo del día, te recordaré que tomes descansos regulares para mantener tu mente alerta y tu cuerpo flexible. Este es un ejemplo de una actividad de descanso: 30 segundos de respiración profunda."},"activityInfo":{"startMorningHabitTitleText":"¡Buenos días! Es hora de enfocarse. Estos son los hábitos que debe lograr antes de poder usar su computadora.","startEveningHabitTitleText":"¡Buenas tardes! Es hora de enfocarse. Estos son los hábitos que debe lograr antes de poder comenzar el día.","startActivityButtonText":"Empieza <TIME> <NAME>","activityFinishedText":"¡<ACTIVITY> completado!✅","lastActivityFinishedText":"¡<ACTIVITY> completado!✅Se ha ganado su tiempo libre del uso de la computadora. 💪","startBreakActivityTitleText":"Es hora de un descanso. Haz <TIME> de <ACTIVITY> para ganar más tiempo libre del uso de la computadora.","doSomeActivityText":"<ACTIVITY>","beforeYouStartText":"Antes de comenzar, tómese unos momentos para reflexionar sobre por qué desea adoptar estos hábitos. Luego visualízate comenzando la secuencia del hábito. Repase mentalmente cualquiera de los hábitos que le resulten más difíciles. Este proceso ayudará a reducir la \\"fricción límbica\\", es decir, preparará su cerebro para hacer los hábitos sin importar nada, incluso si no tiene la aplicación disponible.","beforeYouBeginText":"Antes de comenzar, tómese 30 segundos para visualizarse realizando cada uno de los hábitos. Esto suena raro, pero las investigaciones indican que hacer un ensayo mental como este aumenta la probabilidad de que complete sud hábitos y hace que los hábitos sean más persistentes, de modo que incluso si no no tienes acceso a su computadora/a esta aplicación, seguirás adelante con todos sus hábitos","habitsProgressText":"Has completado <duration> de hábitos - le faltan <totalduration>  ¡Puedes hacerlo!","habitsCompleteText":"Has completado <duration>  de hábitos.","whatComesNextButtonText":"¿Qué viene después?","buttonGetKookyText":"Ponte loco/loca","buttonReviseQuantityText":"Revisa Cantidad","buttonBeginText":"Comenzar","visualizeDescriptionText":"Antes de comenzar tu rutina, tómate 30 segundos para realizar un \\"enfoque extrapersonal\\": procura mantener la mirada fija en un punto. Estudios científicos por “Balcetis and colleagues” en 2020 indican que enfocarse en un punto fijoagudizará tu capacidad de concentración y aumentará la probabilidad de completar tu rutina.","titleGetFocused":"Concéntrate","activitySkippedText":"<ACTIVITY> Posponer!","lastActivitySkippedText":"<ACTIVITY> Postponer! Has completado tu tiempo frente a la pantalla. 💪","buttonSkipHabitText":"Postponer por hoy","buttonPostponeBreakText":"Posponer Descanso cinco minutos","breakDurationText":"Duración de descanso de actividades: <DURATION>"},"common":{"emailId":"team@focusbear.io","unlockMachineButtonText":"Desbloquear la computadora","wrapupButtonText":"Terminemos el día","stayFocusedText":"¡OK - Manténgase concentrado/a durante todo el día!","letsCreatAccountText":"Ahora configuremos una cuenta para ti","buttonAbortText":"Por favor perdóname","buttonCancelText":"Cancelar","buttonOkText":"OK","webhookUrl":"https://hooks.zapier.com/hooks/catch/326116/b98ovxc/","buttonExportText":"Exportar","appName":"Focus Bear","trialExpiredText":"¡Su periodo de prueba ha caducado!","daysRemainingText":"Versión de prueba - <DAYS> de 31 días de prueba restantes","buttonStatusStateFocusText":"ENFOQUE","buttonStatusStateOffText":"APAGADO","buttonStatusStateCallText":"LLAMAR","uninstallConfirmText":"¿Está seguro de que quiere abandonar todos sus hábitos y desinstalar Focus Bear?","yesText":"Sí","noText":"No","uninstallDoneText":"Todos los procesos relacionados con la aplicación se detendrán y la aplicación se cerrará sola. Luego puede arrastrar la aplicación a la Papelera.","buttonUninstallText":"Desinstalar Focus Bear","shutdownNotificationTitle":"Es hora de terminar por hoy. Su tiempo de apagado es en 5 minutos.","appBlockNotificationTitle":"<APP_NAME> no está permitido en el <FOCUS_NAME> modo de enfoque.","focusBreakNotificationTitle":"Su descanso termina en","tabGeneralText":"General","tabFocusText":"Enfoque","tabEditHabitsText":"Configuraciones","tabPasswordText":"Contraseña","tabBlockedURLsText":" Las URL bloqueadas","tabUninstallText":"desinstalar","mondayText":"lunes","tuesdayText":"martes","wednesdayText":"miercoles","thursdayText":"jueves","fridayText":"viernes","saturdayText":"sábado","sundayText":"domingo","andText":"y","tabAccountsText":"Cuentas","checkInternetText":"No se pudo conectar al servidor. Verifica tu conexión a Internet.","uninstallingText":"Desinstalando…","askUninstallReasonText":"¿Puedes decirnos por qué estás desinstalando Focus Bear?","buttonSelectReasonText":"Selecciona un Motivo","brokenAppReasonText":"La app está dañada","habitsHardReasonText":"Mis hábitos son demasiado difíciles - no los puedo realizar","emailTitle":"Tu correo electrónico (si deseas que te respondamos):","buttonPostponeText":"Posponer","noPurchasesFoundText":"No se encontraron compras.","someProblemInCredentialText":"Se presentó un problema. Inicie sesión nuevamente.","askUninstallReasonText2":"Ay no, lo siento, parece que lo decepcionamos. Estamos en las primeras etapas de este producto y realmente queremos recibir comentarios para mejorarlo. ¿Podría decirnos por qué está desinstalando?","minimumCharacterText":"(Mínimo 10 caracteres)","secondsText":"segundos","minuteText":"minuto","minutesText":"minutos","hourText":"hora","hoursText":"horas","timeIncorrectText":"La hora de tu sistema parece ser incorrecta; dice que la hora actual es <SYSTEM_TIME> pero la hora real es <TRUE_TIME>. Focus Bear no funcionará correctamente si no tienes la hora de tu sistema configurada correctamente. Una vez que hayas ajustado la configuración de tiempo, haz clic en el botón \\"Estoy list@ para comenzar mis hábitos\\" a continuación.","buttonIAmReadyText":"Estoy list@ para comenzar mis hábitos","buttonInstructionsText":"Haz clic aquí para ver las instrucciones para corregir la configuración de la hora","notificationVideoCallText":"Parece que estás en una videollamada. No te interrumpiré con micro-descansos durante la reunión para evitar momentos embarazosos de compartir pantalla. ¡Disfruta la reunión!","tabSettingsText":"Configuración","tabPomodoroText":"Pomodoro","tabAdvancedText":"Avanzado","graphQuantityText":"Cantidad","graphMinutesText":"Minutos","graphDateText":"Fecha","graphTimeText":"Tiempo","buttonBackToMyHabitsText":"Regresar a mis hábitos","activitiesSyncErrorText":"Focus Bear no ha podido sincronizar las estadísticas de las actividades debido a mala conexión de internet.","alertAppRestartText":"Focus Bear se reinicia automáticamente si se cierra o bloquea a la fuerza para asegurarse de ayudarte a combatir las distracciones. Si quieres salir de la aplicación/tomar un descanso, use las funciones para salir en la barra de menú en Focus Bear menú.","buttonDontTellAgainText":"Entendido – No mencionar de nuevo","toolTipColorBoxText":"Elija un color para que se muestre en el fondo del icono de la barra de menú superior para ayudar a identificar el modo de enfoque que está ejecutando."},"abortInfo":{"abortingTitle":"Cancelando..","abortingCountDownInfo":{"subTitle":"¿Está seguro de que quieres renunciar a sus hábitos? Tómese 10 segundos para reflexionar sobre si realmente quieres cancelar.","message":"Mientras espera, reflexiona sobre por qué estás haciendo esto. Si fue porque su rutina matutina era demasiado ambiciosa, piense en acortarla para que solo dure unos minutos, de modo que sea más fácil hacerlo que no hacerlo. Si está desactivando porque la aplicación está dañada, ¡Lo siento mucho! Realmente agradeceríamos un correo electrónico con comentarios a team@focusbear.io","pleaseEmailText":"Por favor envíe un correo electrónico","buttonAbortCancelText":"No quise hacer eso. ¡Déjeme continuar con mis hábitos!"},"abortingConfirmInfo":{"subTitle":"¿Puedes compartir por qué estás cancelando?","dropDown_0":{"title":"Seleccione una razón"},"dropDown_1":{"title":"Tengo una emergencia","description":"¡Oh no! Espero que todo esté bien. Restaurando el acceso inmediatamente y cancelando los hábitos durante las próximas 4 horas. Su rutina normal se reanudará después de eso."},"dropDown_2":{"title":"El app está dañado","description":"¡Oh no! Lo sentimos mucho. Desactivaremos todas las ventanas emergentes. ¿Puedes por favor decirnos qué pasó?﹡","emailTitle":"Su correo electrónico (si quieres que le respondamos):","buttonDeactivateText":"Desactivar ventanas emergentes de hábitos"},"dropDown_3":{"title":"Mis hábitos son demasiado difíciles - no puedo lo puedo manejar","description":"Ah, es comprensible. ¿Le gustaría restablecer sus hábitos para que sean de 30 segundos cada uno y un máximo de 5 minutos? Una breve rutina matutina es mejor que nada. Puedes construir desde allí.","buttonStartSmallText":"Sí, voy a empezar poco a poco","buttonDontWantText":"¡NO quiero una rutina matutina en absoluto!","emailTitle":"Su correo electrónico (si quiere que le respondamos):","startSmallInfo":{"subTitle":"Empezando poco a poco..","activityResetText":"Hemos restablecido sus hábitos y actividades de descanso para usted. Ahora tienen sólo 30 segundos de duración, lo que debería hacerlos más manejables.","activityRemovedText":"Eliminamos algunas actividades para que la rutina matutina total dure 5 minutos.","changeSettingsText":"Puede modificar su configuración más tarde desde el icono de la barra de herramientas superior <icon>","shareFeedbackText":"¿Puedes compartir algunos comentarios sobre por qué sus hábitos eran demasiado difíciles?﹡","buttonTitle":"Iniciar rutina acortada"},"givingUpInfo":{"subTitle":"Renunciar a su rutina matutina","description":"No hay problema. Tienes el control.","changeSettingsText":"No dude en reactivar Focus Bear desde el icono de la barra de herramientas superior <icon>","shareFeedbackText":"¿Puedes compartir comentarios sobre la aplicación?﹡","buttonTitle":"Desactivar rutina + descansos"}},"dropDown_4":{"title":"Algo más","description":"¿Puedes decirnos por qué quieres dejar de recibir notificaciones de hábitos y descansos?﹡","emailTitle":"Su correo electrónico (si quieres que le respondamos):","buttonDeactivateText":"Desactivar rutina + descansos"}},"abortDoneInfo":{"title":"Desactivado","subTitle":"Ha desactivado con éxito Focus Bear. La aplicación no mostrará indicaciones de hábitos hasta que la active nuevamente desde el ícono del menú. Si lo desactivó debido a un problema con la aplicación, envíenos un correo electrónico"}},"quitInfo":{"quittingTitle":"Abandonando..","quittingCountDownInfo":{"subTitle":"¿Seguro que quieres salir? Tómese 10 segundos para reflexionar sobre si realmente quieres abandonar.","message":"Mientras esperas, reflexiona sobre por qué estás haciendo esto. Si fue porque su rutina matutina era demasiado ambiciosa, tal vez acortala para que solo dure unos minutos, de modo que sea más fácil hacerlo que no hacerlo. Si estás abandonando porque la aplicación está dañada, ¡lo siento mucho! Valoramos sus comentarios: team@focusbear.io","pleaseEmailText":"Por favor envíe un correo electrónico","buttonQuitCancelText":"No quise hacer eso. ¡Déjeme continuar con mis hábitos!"},"quittingConfirmInfo":{"subTitle":"¿Puedes compartir por qué estás abandonando","buttonQuitText":"Abandonar","emailTitle":"Su correo electrónico (si quieres que le respondamos):","dropDown_0":{"title":"Selecciona una razón"},"dropDown_1":{"title":"Tengo una emergencia","description":"¡Oh no! Espero que todo esté bien. Restaurando el acceso inmediatamente y cancelando los hábitos durante las próximas 4 horas. Su rutina normal se reanudará después de eso."},"dropDown_2":{"title":"El app está dañado","description":"Oh no! Lo sentimos mucho. Desactivaremos todas las ventanas emergentes. ¿Puedes por favor decirnos qué pasó?﹡","finalDescription":"¡Esperamos que pronto retome los hábitos! Lo veremos pronto."},"dropDown_3":{"title":"Algo más.","description":"¿Puedes decirnos por qué quieres dejar de recibir notificaciones de hábitos y descansos?﹡","finalDescription":"¡Esperamos que pronto retomes los hábitos! Lo veremos pronto."}},"askQuitVcInfo":{"subTitle":"¿Quisieras abandonar completamente o solo quieres tomar un descanso por un par de horas?","buttonDiableAppText":"Quisiera un descanso de 4 horas","buttonQuitText":"Apagar completamente – Regresare cuando esté listo"}},"shutOffTimeInfo":{"title":"Hora de relajarse.","subTitle":"Me dijo que no quería usar su computadora desde <SHUTOFFTIME> hasta <STARTTIME>. Disfrute de su noche y duerma bien. Espero poder ayudarle con su rutina matutina mañana.","buttonAbortText":"Obtenga acceso ahora","shutOffAbortInfo":{"title":"Emergencia?","subTitle":"¿Seguro que quieres hacer esto? Usar su computadora a altas horas de la noche podría arruinar su sueño. Tómate 30 segundos para reflexionar sobre si se trata realmente de una emergencia o si puede esperar.","shareFeedbackText":"Siéntase libre de escribir una explicación aquí:","buttonUnlockText":"Desbloquear"},"shutOffAbortDoneInfo":{"subTitle":"Lamento escuchar que sucedió algo malo y que es absolutamente necesario que uses tu computadora muy tarde en la noche. Estamos desbloqueando tu computadora ahora. Tu rutina matutina aún se activará a las <STARTTIME>. Espero que puedas recuperar el sueño durante el día.","unlockingText":"Desbloqueo en"}},"settings":{"title":"Ingrese la configuración JSON a continuación:","buttonSaveText":"Guardar","visitText":"Visite <SETTINGURL> para generar configuraciones","settingUrl":"focusbear.io/settings-generator","schemaError":"Su configuración no se puede validar.","buttonOkText":"OK","settingIsNotValidText":"Lo siento, parece que su configuración no es válida. Genera configuraciones en el siguente link, gainyourscreentime.com/settings","buttonEditSettingsText":"Editar Configuración","buttonAdvancedText":"Avanzado","description":"Dale clic a \\"Editar Configuración\\" para modificar tu configuración existente. Si eres un usuario avanzad@ haz clic en \\"Avanzado\\"para ver o editar la configuración JSON","settingIsValidText":"Tu configuración ha sido validada y se aplicará ahora."},"trialNagInfo":{"title":"Focus Bear","description":"Ofrecemos un período de prueba de 21 días, durante el cual puedes evaluar Focus Bear en tu tiempo libre. La versión de prueba es una versión TOTALMENTE funcional y podrás evaluar todas las funciones.","buttonStartTrialText":"EMPIEZA TU PRUEBA GRATUITA DE 31 DÍAS","buttonContinueTrialText":"Continuar con la prueba","buttonRegisterNowText":"Regístrate ahora","trialPeriodText":"Periodo de prueba","daysRemainingText":"Días restantes","getLicenseKeyDescription":"Si no tiene una clave de licencia, ¡obtenga una!","buttonBuyNowText":"Compra ahora","buttonlicensekeyText":"Introduzca la clave de la licencia"},"activationNagInfo":{"title":"Activación de Focus Bear","description":"Pegue la clave de licencia en el cuadro de texto a continuación y haga clic en Activar para desbloquear todas las funciones.","buttonPasteText":"Haga clic aquí para pegar la clave de licencia copiada.","buttonActivateText":"Activar","buttonBuyLicenseText":"Comprar licencia","buttonBackText":"Atrás","noInternetTitle":"No hay conexión a internet","noInternetSubTitle":"Asegúrese de que su dispositivo esté conectado a Internet.","successfullyActivatedTitle":"¡Gracias!","successfullyActivatedSubTitle":"¡Has activado con éxito Focus Bear!","buttonOkText":"OK","activationErrorTitle":"No se puede activar.","activationErrorSubTitle":"Introduzca una clave de licencia válida."},"menuInfo":{"menuItemReactivateTitle":"Reactivar","menuItemEnterLicenseKeyTitle":"Introduzca la clave de la licencia","menuItemSettingsTitle":"Configuraciones","menuItemPreferencesTitle":"Preferencias","menuItemExportStatisticsTitle":"Exportar estadísticas","menuItemFocusTitle":"Enfoque","menuItemHardcorePomodoroModeTitle":" Modo de Pomodoro Súper","menuItemFocusPreferencesTitle":"Preferencias de enfoque","menuItemStartPomodoroTitle":"Inicia modo Pomodoro","menuItemStopHardcorePomodoroTitle":"Parar Modo de Pomodoro Súper","menuItemCheckForUpdatesTitle":"Buscar actualizaciones","menuItemEnableOfficeModeTitle":"Modo de oficina habilitado","menuItemDisableOfficeModeTitle":"Modo Trabajo Desde Casa  habilitado","menuItemQuitTitle":"Abandonar","untilTimeText":"Prendido hasta <TIME>","onText":"Prendido","noOfficeFriendlyActivityAlertText":"No tiene ninguna actividad de descanso para la oficina. Quieres que le agregue una para que se pare y estire por 20 segundos?","noOfficeFriendlyActivityButtonFirstText":"Si, suena bien","noOfficeFriendlyActivityButtonSecondText":" ¡No, soy una maquina! No necesito descanso.","officeModeEnabledSuccessfullyText":"¡OK! Solo le pediré que hagas actividades que no extrañen a otras personas (hacer flexiones en paradas de manos en la oficina podría verse raro).","menuItemUpgradeNowTitle":"Actualizar ahora","subscriptionExpiredText":"Su suscripción ha expirado","menuItemStartBreakTitle":"Descanso de inicio","menuItemBrainDumpTitle":"Notas Rápidas","toolTipOfficeMode":"Cuando estés trabajando desde la oficina, solo te daré actividades de descanso apropiadas (por ejemplo, estiramientos de silla en lugar de flexiones).","toolTipWfhMode":"¡No hay nadie cerca! Puedes hacer actividades de descanso que sean un poco más divertidas (por ejemplo, bailar como si nadie estuviera mirando).","menuItemToolsTitle":"Herramientas >","menuItemOpenToolboxTitle":"Abrir caja de herramientas"},"preferencesInfo":{"titlePomodoro":"Modo de Pomodoro:","checkBoxPomodoroText":"Ingrese al modo Pomodoro después de completar la rutina matutina","titleReduceMotion":"Reducir movimiento:","checkBoxReduceMotionText":"Prefiero movimiento reducido (no mostrar osos animados)","titleAskNextHabit":"Recordatorio del siguiente hábito:","checkBoxPromptToAskNextHabitText":"De vez en cuando puedes avisarme para que recuerde el siguiente hábito","titleSelectLanguage":"Seleccionar Idioma:","alertChangeLanguageMessageText":"¿Estás seguro de que quieres cambiar el idioma a <LANGUAGE>?","buttonAdvancedText":"Avanzado","pomodoroModeDurationText":"Duración del Modo de Pomodoro:","minutesText":"minutos","hardCorePomodoroEnabledText":"Modo de Pomodoro Súper habilitado para concentrarse en <FOCUSTYPE> por <COUNT> pomodoros el/los <DAYS>.","hardCorePomodoroNotEnabledText":"Modo de Pomodoro sin habilitar.","automaticPomodoroNotEnabledText":"Modo de Pomodoro automático esta deshabilitado.","reviewFocusModeAlertText":"Por favor revisa las configuraciones del modo de enfoque para modo de pomodoro Súper.","breakDurationText":"Duración del descanso:","titleSurveillance":"Vigilancia:","checkBoxSurveillanceText":"Estoy bajo vigilancia del empleador","descriptionSurveillanceText":"Ocultar Focus Bear en capturas de pantalla","workDurationEmptyErrorText":"Duración del trabajo no puede estar vacío.","workDurationZeroErrorText":"Duración del trabajo no puede ser 0.","breakDurationEmptyErrorText":"Duración del descanso no puede estar vacío.","breakDurationZeroErrorText":"Duración del descanso no puede ser 0.","versionText":"Version:","titleSound":"Sonido:","checkBoxSoundText":"Reproducir efectos de sonido","statisticsText":"Estadísticas:","updatesText":"Actualizaciones:","titleAppMode":"Modo de oso de enfoque:","checkBoxCuddlyBearText":"Modo de osito de peluche","descriptionCuddlyBearText":"Modo de osito de peluche: amable y gentil: te da el beneficio de la duda cuando abres una URL no permitida. Te deja permitir temporalmente las URL bloqueadas durante un modo de enfoque.","checkBoxGrizzlyBearText":"Modo de oso pardo","descriptionGrizzlyBearText":"Modo Grizzly Bear: súper estricto: bloquea inmediatamente las URL que no están permitidas y no se permita permitirlas hasta que finalice el modo de enfoque.","pomodoroDescriptionText":"Modo Pomodoro tiene ciclos entre trabajo duro cuando el modo de enfoque ha sido encendido (y las distracciones apagadas) y periodos de descanso.","buttonLearnPomodoroTechniqueText":"Aprende más acerca de la técnica Pomodoro aquí.","titleDockIcon":"Icono de muelle:","checkBoxShowDockIconText":"Mostrar icono de muelle"},"focusPreferencesInfo":{"titleFocusType":"Tipo de enfoque:","titleAllowedAllApps":"Permitir todas las aplicaciones","titleAllowedSelectedApps":"Permitir aplicaciones seleccionadas","titleAllowedAllUrls":"Permitir todas las URL","titleAllowedSelectedUrls":"Permitir las URL seleccionadas (solo funciona con Safari y Chrome)","noFocusAddedText":"Agregue un tipo de enfoque en el panel izquierdo.","deleteFocusTypeMessageText":"¿Está seguro de que desea eliminar el tipo de enfoque seleccionado?","yesText":"Sí","noText":"No","urlPlaceHolderString":"google.com","invalidDomainText":"Introduzca un dominio web válido.","invalidDomainTextSecond":"Si desea permitir todas las URL, seleccione \\"Permitir todas las URL\\".","buttonCancelText":"Cancelar","buttonAddText":"Agregar","buttonSaveText":"Guardar","titleAddWebUrl":"Agregar URL web","titleEditWebUrl":"Editar URL web","titleAddFocusType":"Añadir Tipo de Enfoque","titleTitle":"Título:","titleColor":"Color:","errorSameFocusType":"Ya existe un tipo de Enfoque con el mismo nombre.","buttonSelectAppText":"Seleccionar","appAlreadyExistsText":"Algunas de las aplicaciones seleccionadas ya están presentes en la lista.","urlAlreadyExistsText":"<APPNAME> ya existe en la lista.","focusCanNotDeleteTitle":"No se puede eliminar.","focusCanNotDeleteSubTitle":"El tipo de enfoque Predeterminado no se puede eliminar.","focusModeOnText":"El modo de enfoque está activado. Desactive el modo de enfoque para eliminarlo.","duplicateText":"Duplicar","toolTipAdd":"Agregar","toolTipRemove":"Remover","toolTipDuplicate":"Duplicar","hardCorePomodoroIsOnMessageText":" El modo Pomodoro Súper está activado. Por favor ancele el modo Pomodoro Súper para eliminarlo.","buttonAdvancedText":"Avanzado","defaultFocusText":"¡Anarquía completa! No bloquees nada 😬","meetingsFocusText":"Reuniones","disablePomodoroModeAlertText":"El modo de enfoque seleccionado está habilitado en el modo pomodoro Súper. Por favor deshabilite el modo pomodoro Súper para eliminar esto.","buttonAddFocusTypeText":"Agrega modo de enfoque","buttonDeleteFocusTypeText":"Eliminar","allowUrlInstructionFirstText":"Para permitir un determinado sitio web escribe: dominio.com","allowUrlInstructionSecondText":"Para permitir todos los subdominios de un sitio web escribe: *.domain.com","allowUrlInstructionThirdText":"Para permitir cualquier página web que contenga texto en la URL o el título de la página: reactnative o React Native","blockUrlInstructionFirstText":"Para bloquear un determinado sitio web escribe: dominio.com","blockUrlInstructionSecondText":"Para bloquear todos los subdominios de un sitio web escribe: *.domain.com","lockedFocusText":"Enfoque bloqueado en la actividad actual","titleBlockedAllUrls":"Bloquear todas las URL","titleBlockedSelectedUrls":"Bloquear URL seleccionadas (solo funciona con Safari y Chrome)","titleAllowUrlListApproch":"Bloquear todo excepto los sitios seguros que elija","titleBlockUrlListApproch":"Permitir todo excepto ciertos sitios que me distraen","allowUrlsQuestionText":"¿Cómo deseas permitir las URL?","blockUrlsQuestionText":"¿Cómo deseas bloquear las URL?"},"focusPreferencesAdvancedInfo":{"runScriptBeforeText":"Ejecute el script de Apple antes de iniciar el modo de enfoque.","runScriptAfterText":"Ejecute el script de Apple después de iniciar el modo de enfoque.","titleCurrentAppleScript":"Script actual de Apple:","buttonSelectScriptText":"Seleccionar el script de Apple","titleBlockedUrls":" Las URL bloqueadas","selectScriptFileText":"Seleccione un archivo de script","buttonSelectText":"Select","pleaseSelectScriptText":" Por favor seleccione un script de Apple.","toolTipAdd":"Agregar","toolTipRemove":"Remover","instructionText":"Las URL aquí se bloquearán durante este modo de enfoque. Útil si desea permitir algunos sitios web pero bloquear otros. Por ejemplo, podría tener *.google.com como una URL permitida pero bloquear tv.google.com","autoOnDoNotDisturbText":"Enciende NO MOLESTAR automáticamente cada vez que des inicio a Focus Mode.","needDndPermissionText":"Para encender NO MOLESTAR cuando inicies el modo de enfoque, Focus Bear necesita permisos de accesibilidad, ¿Te gustaría dar permiso ahora?"},"focusInfo":{"focusAlreadyRunningText":"Ya se está ejecutando un modo de enfoque. Desactive el modo de enfoque en ejecución para iniciar uno nuevo.","startingFocusModeInfo":{"buttonStartFocusText":"Inicia Enfoque","howMuchTimeText":"¿Cuánto tiempo quiere concentrarse?:","hoursText":"horas","minutesText":"minutos","title":"Tipo de enfoque inicial - <FOCUSTYPE>","questionText":"¿Qué planea lograr durante este bloque/bloques de enfoque?","onlyAllowSelectedAppText":"Solo podrás usar <APP>","onlyAllowSelectedAppAndUrlText":"Solo podrás usar \\"<URL>\\" en <APP>","explanationText":"Establece una intención para el bloque de enfoque que ayude a preparar tu cerebro para realizar esa tarea. Para editar la intención después de iniciar el modo de enfoque, haz clic en Notas Rápidas en la barra de menú."},"abortingFocusModeInfo":{"title":"Desactivación del tipo de enfoque - <FOCUSTYPE>","questionText":"¿Puede compartir por qué estás desactivándolo?","reasonsFirstText":"El modo de enfoque no funciona correctamente.","reasonsSecondText":"Logre lo que quería demasiado temprano.","reasonsThirdText":"Tengo una emergencia","buttonCancelText":"Cancelar","buttonAbortFocusText":"Desactivar modo de Enfoque"},"focusCompletedInfo":{"title":"¡Lo logró!","subTitle":"Ha completado con éxito el bloque/bloques de enfoque - <FOCUSTYPE>","questionFirstText":"¿Qué logró durante este tiempo?","questionSecondText":"Algunas distracciones?","titleIntention":"¿Su intención fue?","buttonTakeBreakText":"Tómese un descanso de 5 minutos"},"focusSummaryInfo":{"title":"Completaste <COUNT> bloque/bloques de enfoque hoy.","buttonContinueText":"Iniciar rutina nocturna","focusTableColumnFirstText":"Tipo de Enfoque","focusTableColumnSecondText":"Hora de inicio","focusTableColumnThirdText":"Duración","focusTableColumnFourthText":"Trabajo logrado","focusTableColumnFifthText":"Distracciones presentadas","activityTableColumnFirstText":"Actividad","activityTableColumnSecondText":"Cantidad Total","activityTableColumnThirdText":"Promedio","activityTableColumnSixthText":"Duración Total","titleActivitySummaryText":"Resumen de la Actividad:","titleFocusSummaryText":"Resumen de Enfoque:","totalFocusTimeText":"Tiempo total de enfoque: <TIME>","buttonNeedMoreTimeText":"Necesito trabajar más tiempo","buttonStillNeedMoreTimeText":"Todavía necesito trabajar más tiempo"},"discourageDefaultFocusInfo":{"title":"¿Está seguro? Es bastante fácil distraerse sin usar un modo de enfoque más restrictivo","buttonCancelText":"Ah, supongo que tiene razón: ¡CANCELAR!","buttonShutUpText":"Cállese, sé lo que estoy haciendo.","titleGoodLuck":"¡OK buena suerte! (La necesitarás 😅)"},"suggestFocusInfo":{"title":"¿Necesitará usar otras aplicaciones durante la reunión? Si no, puedo bloquear todo lo demás para ayudarte a concentrarte.","subTitle":"Al seleccionar \\"Bloquear todo lo demás\\", la aplicación iniciará el modo de enfoque \\"Reuniones\\".","buttonBlockText":"Bloquea todo lo demás","buttonCancelText":"Está bien que use otras aplicaciones durante esta reunión"}},"pomodoroInfo":{"title":"Es Hora de Enfocarse","questionFirstText":"¿Qué quieres lograr en esta sesión de pomodoro?","questionSecondText":"¿Qué modo de enfoque quieres usar?","buttonEditFocusModeText":"Editar modos de enfoque","buttonLetsDoItText":"Vamos a hacerlo","buttonHardcorePomodoroText":"Use el modo pomodoro Súper (bloquee el modo de enfoque para múltiples pomodoros)","howManyPomodoroText":"¿Por cuantos pomodoros se quiere concentrar?:","chooseTheFocusModeText":"Elije el modo de enfoque y la duración: no podrá cambiar el modo de enfoque hasta que se acabe el tiempo (todavía puede usar cualquier aplicación / sitio web durante el descanso de 5 minutos)","alertWarningPaswwordSetText":"Para que el modo pomodoro Súper sea más efectivo, recomendamos establecer una contraseña (pídele a otra persona que lo haga por usted); de lo contrario, aún podrá cancelar los modos de enfoque antes de que se acabe el tiempo..","completedPomodoroCountText":"Has completado <COMPLETED_POMODORO> de <TOTAL_POMODORO> pomodoros. Faltan <REMAINING_POMODORO> más."},"logQuantityInfo":{"title":"Registra la Cantidad de la actividad","buttonCancelText":"Cancelar","buttonOkText":"OK","enterValidValueText":"Por favor ingrese una cifra válida.","quantityIsEmptyText":"La cantidad de registro no puede estar vacía.","logQuantityQuestionText":"¿Cuántas <activity> hiciste?"},"enterPasswordViewInfo":{"title":"Por favor ingrese la contraseña para continuar","passwordPlaceholderText":"Contraseña","buttonResetPasswordText":"Restablecer la contraseña","blankPasswordErrorTitle":"La contraseña no puede estar en blanco.","blankPasswordErrorSubTitle":"Por favor introduce una contraseña válida.","incorrectPasswordErrorTitle":"Contraseña no válida.","alertConfirmResetPasswordTitle":"Restablecer la contraseña","alertConfirmResetPasswordSubTitle":"Su contraseña actual se eliminará después de 24 horas. Luego puede establecer una nueva contraseña. ¿Continuar?","alertPasswordResetDoneTitle":"Restablecimiento de contraseña en curso","alertPasswordResetDoneSubTitle":"Establezca una nueva contraseña después de 24 horas."},"passwordPreferencesInfo":{"titleSetPassword":"Configurar la contraseña","titleChangePassword":"Cambiar Contraseña","newPasswordPlaceholderText":"Nueva Contraseña","confirmPasswordPlaceholderText":"Confirma Contraseña","infoText":"Deberás proporcionar la contraseña cuando canceles tu rutina matutina o vespertina o incluso el modo súper pomodoro. Puedes restablecer la contraseña en cualquier momento, sólo tiene que esperar 24 horas.","buttonSetPasswordText":"Configurar la Contraseña","buttonChangePasswordText":"Cambiar Contraseña","passwordNotSetText":"Si tienes problemas para mantener tus hábitos, pide a un compañero de piso, tu pareja o a alguien con quien convivas que establezca una contraseña. No podrás saltarte los hábitos sin la contraseña.","passwordSetText":"Responsabilidad adicional: tienes una contraseña activa configurada y no puedes saltarte tus hábitos sin que un amigo ingrese la contraseña.","passwordBlankAlertTitle":"La contraseña no puede estar en blanco.","passwordBlankAlertSubTitle":"Por favor introduce una contraseña válida.","confirmPasswordBlankAlertTitle":"Confirmar contraseña no puede estar en blanco.","confirmPasswordBlankAlertSubTitle":"Ingrese una \\"Confirmar contraseña\\" válida.","passwordSetAlertTitle":"Contraseña configurada con éxito.","passwordChagedAlertTitle":"Contraseña cambiada correctamente.","passwordNotMatchAlertTitle":"Las contraseñas no coinciden.","passwordNotMatchAlertSubTitle":"Confirmar contraseña no coincide con la contraseña principal. Por favor, vuelva a escribirla.","buttonDisablePasswordText":"Deshabilitar mi contraseña","passwordDisableAskText":"¿Estás seguro de que deseas deshabilitar tu contraseña?","passwordDisableDoneText":"Su contraseña ha sido deshabilitada"},"blockedUrlsViewInfo":{"title":" Las URL siempre bloqueadas","invalidDomainText":"Agregar * bloqueará todas las URL. Utilice otra combinación.","subTitleText":"Bloquea estas URL incluso si no estás en un bloque de enfoque. Es posible que desees colocar redes sociales o sitios de noticias que preferirías no usar en ningún momento. Siempre puedes configurar una actividad de rutina vespertina la que permita explícitamente el acceso a Facebook para seguir conectado, excepto durante su rutina matutina o día de trabajo."},"rememberNextHabitViewInfo":{"randomPhraseRightChoice1":"¡Vas muy bien!","randomPhraseRightChoice2":"¡Oh si!","randomPhraseRightChoice3":"¡Usted puede!","randomPhraseRightChoice4":"Puedo jubilarme ahora porque sabes exactamente lo que estás haciendo.🙂","randomPhraseWrongChoice1":"Uy, no del todo - es <CORRECT_HABIT_NAME>","randomPhraseWrongChoice2":"Casi - es <CORRECT_HABIT_NAME>","Title":"¿ Qué sigue?","description":"Quiero asegurarme de que usted no se vuelva demasiado dependiente de mí. Habrá días en los que no tenga acceso a su computadora, pero eso no significa que no cumplirá con sus hábitos. Piense en mí como ruedas de entrenamiento de una bicileta: estoy aquí para ayudarle a consolidar sus hábitos hasta que se vuelvan automáticos. Hagamos un ejercicio rápido para asegurarnos de que recuerda cómo acumular sus hábitos incluso cuando no estoy presente.","questionText":"Acabas de completar <LAST_HABIT_NAME>. ¿Qué hábito harás a continuación?","selectHabitText":"Selecciona Hábito","enterToChooseText":"Presiona INGRESAR para elegir una opción"},"preloadFocusModesViewInfo":{"title":"¿Qué tipo de trabajo realiza principalmente?","titleSelectWorkType":"Selecciona tipo de trabajo","titleProgramming":"Programación","titleGraphicDesign":"Diseño gráfico","titleDataAnalysis":"Análisis de datos","titleSomethingElse":"Algo diferente","buttonContinueText":"Continuar","workText":"Trabajo","placeholderWorkText":"Cirugía de cohetes"},"pomodoroPreferencesAdvancedInfo":{"checkBoxUseHardcorePomodoroText":"Usa el modo pomodoro Súper","descriptionHardcorePomodoroText":"(Bloquear el modo de enfoque para múltiples pomodoros)","chooseFocusText":"Elija el modo de enfoque","descriptionChooseFocusFirstText":"No podrás cambiar el modo de enfoque hasta que se acabe el tiempo.","descriptionChooseFocusSecondText":"(Todavía puedes usar cualquier aplicación/sitio web durante su descanso de 5 minutos)","HowManyPomodoroText":"¿Por cuántos pomodoros se quiere concentrar?:","selectDaysForPomodoroText":"Programe días específicos en los que desea ejecutar el modo pomodoro extremo después de la rutina matutina:","buttonApplyText":"Aplicar","selectAtleastOneDayText":"Seleccione al menos un día."},"accountVcInfo":{"title":"Información de tu cuenta","titleNameText":"Nombre:","titleEmailIdText":"Correo electrónico:","buttonLogoutText":"Cerrar Sesión","registeredVersionText":"Suscripción activa","logoutAlertText":"¿Está seguro de que deseas cerrar la sesión?","titleUserIdText":"Identificación de usuario:","restoreText":"Si ya compró una suscripción a Focus Bear, haga clic en Sincronizar estado de pago para activarla aquí.","buttonRestoreText":"Sincronizar estado de pago"},"activityPostponeInfo":{"postponeHabitsText":"Si tienes alguna urgencia, puedes pausar tus hábitos por algunos minutos.","postponeBreakText":"Si tienes alguna urgencia, puedes posponer la actividad de descanso por 5 minutos.","buttonTakeBreakText":"¡Ay, está bien, me tomaré un descanso!","selectMinutesText":"Selecciona cuántos minutos deseas posponerlo:","buttonCompletelySkipText":"Omitir completamente","buttonPostponeHabitText":"Posponer Hábito","buttonPostponeBreakText":"Posponer Descanso","buttonAbortBreakText":"Cancelar Interrupción","posponedLastBreakText":"Pospusiste el último descanso. ¿Estás seguro de que no puedes tomarlo esta vez?","buttonEnableOfficeModeText":"Cambiar al modo de oficina","officeModeEnableText":"Ok, te daré algunas actividades de descanso que recomendamos para hacer en un entorno de oficina","postponedLastHabitText":"Has pospuesto tus hábitos varias veces. ¿Estás seguro de que quieres posponerlos otra vez?","buttonDoHabitText":"Cambié de parecer, seguiré con mis hábitos"},"brainDumpVcInfo":{"title":"Focus Bear - Volcado de cerebros","titleIntentionText":"Intención:","titleTimeRemainingText":"Tiempo restante:","titleWorkNoteFirst":"Cosas que haré en mi próximo descanso:","titleWorkNoteSecond":"Cosas que querías hacer en tu descanso:"},"askLogInVcInfo":{"title":"Haz que los hábitos saludables y el trabajo profundo sean el camino de menor resistencia","messageText":"Inicia sesión con una cuenta de Focus Bear para administrar tu tiempo sin pensar en ello. Tener una cuenta te ayuda a establecer las horas de uso de tu computadora, crear una rutina personalizada para la mañana y la noche, y personalizar tus modos de enfoque para diferentes actividades.","buttonSignInText":"Iniciar sesión","buttonSignUpText":"Regístrate"},"upgradeNowVcInfo":{"pointFirstText":"Rutinas de hábitos personalizadas","pointSecondText":"Descansos que aumentan la productividad","pointThirdText":"Modos de enfoque personalizables","pointFourthText":"Seguimiento automático de objetivos","buttonUpgradeNowText":"Actualizar ahora","moneyBackText":"30 días de garantía con devolución de dinero","syncInfoText":"Después de pagar, haz clic en el botón Sincronizar estado de pago a continuación","buttonRestoreText":"Sincronizar estado de pago","subscriptionExpiredText":"Su suscripción ha expirado"},"onboardingPostponeVcInfo":{"title":"Si tienes algo urgente, puedes posponer el proceso de inducción por unos minutos","selectMinutesText":"Seleccionar cuantos minutos a posponer:","buttonPostponeText":"Posponer inducción"},"welcomeOnboardingVcInfo":{"subTitle":"¡Bienvenido a bordo!","descriptionFirstText":"Espero poder ayudarte a formar hábitos saludables y realizar un bloques de trabajo más profundos. El proceso de inducciión demora cinco minutos y requiere el 100 % de tu atención","descriptionSecondText":"No podrás usar otras aplicaciones durante la inducción. ¿Tienes tiempo ahora o lo hacemos un poco más tarde?","buttonLaterText":"Un poco más tarde, por favor","buttonLetsDoItText":"Hagámoslo ya","allRightsReservedText":"© 2022 Focus Bear Todos los derechos reservados.","confirmText":"Sólo quiero confirmar por última vez que estás de acuerdo con esto; durante el próximo minuto no podrás usar otras aplicaciones mientras realices la inducción","buttonConfirmLetsDoItText":"Sí, hagámoslo, tengo un minuto","buttonNeedMoreTimeText":"Uhh, necesito unos minutos más"},"upgradeNowUrl":"https://dashboard.focusbear.io/subscription","customLoginVcInfo":{"titleSignIn":"Iniciar sesión","titleSignUp":"Registrarse","subTitleCreateAccount":"Crear una cuenta","subTitleWelcomeback":"Bienvenido de nuevo","titleEmailAddress":"Correo electrónico","titlePassword":"Contraseña","titleConfirmPassword":"Confirma tu contraseña","buttonSignInText":"Iniciar sesión","buttonCreateAccountText":"Crear una cuenta","titleEmailIsBlank":"El correo electrónico no puede estar vacío.","emailInvalidText":"Ingrese un correo electrónico válido.","titlePasswordIsBlank":"La contraseña no puede estar vacía.","passwordInvalidText":"Por favor ingrese una contraseña válida.","titleInvalidEmail":"El correo electrónico no es válido","titleConfirmPasswordBlank":"La contraseña de confirmación no puede estar vacía.","confirmPasswordInvalidText":"Ingrese una \\"Confirmar contraseña\\" válida.","titlePasswordNotMatch":"Las contraseñas no coinciden.","confirmPasswordNotMatchText":"La contraseña de confirmación no coincide con la contraseña principal. Vuelve a ingresarla.","titleSignupFailed":"Error al registrarse.","titleLoginFailed":"Error al iniciar sesión.","titlePasswordRules":"Reglas de contraseña:","buttonForgotPasswordText":"Olvidé mi contraseña","passwordRuleFirstText":"Al menos 8 caracteres de longitud","passwordRuleSecondText":"Contener al menos 3 de los siguientes 4 tipos de caracteres:","passwordRuleThirdText":"letras minúsculas (a-z)","passwordRuleFourthText":"letras mayúsculas (A-Z)","passwordRuleFifthText":"números ( es decir, 0-9)","passwordRuleSixthText":"caracteres especiales (por ejemplo, !@#$%^&*)"},"loginHelpVcInfo":{"title":"Debería abrirse una ventana de incógnito donde puede iniciar sesión o registrarse. Si no la ve, intenta abrir Safari manualmente. Si aún no puedes verla","buttonClickHereText":"Haga clic aquí"},"onboardingCardsInfo":{"title":"Notas importantes","controllingBrowserText":"Controlando tu navegador","controllingBrowserDescription":"La próxima vez que abras una pestaña del navegador, verás esta ventana emergente. La razón por la que solicitamos permisos para controlar tu navegador es para que podamos bloquear sitios web que te distraen cuando activas el modo de enfoque.","buttonGotItText":"Entendido","titleSignUpSuccessful":"Registro exitoso","signupSuccessText":"Genial, todos están registrados. Solo les daré algunos consejos antes de que comiencen a usarlo.","buildingHabitsText":"Construir mejores habitos","buildingHabitsDescription":"Focus Bear te ayudara a construir hábitos fuertes durante la mañana y la noche bloqueando distracciones. Pero no te preocupes - si necesitas ingresar a tu computadora por alguna urgencia, solo da click a \\"permíteme por favor\\" botón arriba a la derecha.","brainBreaksText":"Descansos Mentales","brainBreaksDescription":"Para evitar dolores de cabeza y cuello, Focus Bear te alienta a tomar descansos durante intervalos regulares. Te damos un anuncio de 30 segundos, así tu puedes posponer tu descanso si estas muy ocupado. ¡También detectamos si estas en reunión y no mostramos descansos ya que eso podría causar un momento incomodo si estas compartiendo pantalla!","buttonBackText":"Atras","buttonNextText":"Siguiente"},"breakWarningVcInfo":{"title":"Tu descanso comienza en","buttonPostponeText":"Posponer por 5 minutos","postponeConfirmText":"Pospusiste el último descanso. ¿Estás seguro de que no puedes hacer tiempo para el descanso ahora?","buttonTakeBreakText":"¡Argh, está bien, me tomaré un descanso!"},"askAppWorkVcInfo":{"title":"Bienvenido a Focus Bear","questionText":"¿Cuáles son tus metas?","checkBoxFirstText":"Ayúdame a desarrollar hábitos saludables por la mañana (p. ej., meditar antes de empezar a trabajar) y por la noche (p. ej., cenar con mis seres queridos)","checkBoxSecondText":"Ayúdame a mantener la concentración durante la jornada laboral","buttonContinueText":"Continuar"},"toolBoxVcInfo":{"title":"La caja de herramientas facilita la apertura de las aplicaciones y sitios web que has permitido en el modo de enfoque <FOCUS_NAME>. Puedes acceder desde el Menú en Herramientas.","checkBoxText":"No volver a mostrar esto cuando inicie un bloque de enfoque","appsText":"Aplicaciones:","urlsText":"Urls:","windowTitleText":"Focus Bear - Caja de herramientas"},"skipHabitVcInfo":{"title":"Posponer habito ahora","buttonDoHabitsText":"Cambie de opinión – Trabajare en mis hábitos"},"popUpBlockConfirmVcInfo":{"title":"¿Necesitas usar <URL> when you\'re focusing on <FOCUSTYPE>?","buttonAllowText":"Si – solo esta vez","buttonBlockText":"No – Me estaba distrayendo","buttonEditSettingsText":"Editar Ajustes"}}');

/***/ }),

/***/ 626:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"welcomeInfo":{"welcomeMessageHeading":"Welcome to Focus Bear","welcomeMessageIntro":"Every morning, I will help you silence your urge to check email/Facebook and help you to do your morning routine instead.\\nYou can configure your own routine later but for now, I’ll give you a suggested activity: 30 seconds of mindful breathing.\\nWhile you breathe deeply, think of how awesome you’ll be if you stick to your morning routine every day.","welcomeEndMessage":"Hope you feel calmer. You can now personalise your morning routine by clicking on the icon <icon> on the top bar and choosing Preferences -> Settings.","preloadFocusModesDoneText":"Here\'s a short video that explains how to use Focus Bear.","introActivities":[{"name":"Mindful Breathing","duration_seconds":30,"video_urls":["https://www.youtube.com/watch?v=CUre1WgjIyU"]}],"welcomeVideoUrl":"https://www.youtube.com/watch?v=TvfNJ1AaT9M","welcomeMessageOnlyBreakIntro":"Throughout the day, I\'ll remind you to take regular breaks to keep your mind sharp and your body flexible. Here\'s an example of a break activity: 30 seconds of deep breathing."},"activityInfo":{"startMorningHabitTitleText":"Good Morning! Here are the habits to kick off an awesome day.","startEveningHabitTitleText":"Good Evening! Let’s go through your wind down routine.","startActivityButtonText":"Start <TIME> <NAME>","activityFinishedText":"<ACTIVITY> finished!✅","lastActivityFinishedText":"<ACTIVITY> finished!✅ You’ve earned your screen time. 💪","startBreakActivityTitleText":"It’s time for a break. Do <TIME> of <ACTIVITY> to earn more screentime.","doSomeActivityText":"<ACTIVITY>","beforeYouStartText":"Before you start, take a few moments to reflect on why you want to do these habits. Then visualise yourself beginning the habit sequence. Mentally walk through any of the habits that are going to be harder. This process will help reduce \\"limbic friction\\", i.e. prime your brain to do the habits no matter what, even if you don\'t have the app available.","beforeYouBeginText":"Before you begin, take 30 seconds to visualise yourself performing each of the habits. This sounds kooky but research indicates that doing a mental rehearsal like this increases the likelihood of you completing the habits and makes the habits more sticky so that even if you don\'t have access to your computer/this app, you\'ll still do all the habits","habitsProgressText":"You have completed <duration> of habits - <totalduration> to go. You can do it!","habitsCompleteText":"You have completed <duration> of habits.","whatComesNextButtonText":"What comes next?","buttonGetKookyText":"Visualize 🧘‍♂️","buttonReviseQuantityText":"Revise Quantity","buttonBeginText":"Begin","visualizeDescriptionText":"Before you begin your routine, take 30 seconds to engage in \\"extrapersonal focus\\": try your best to keep your eyes fixed on the target. Research from Balcetis and colleagues in 2020 indicates that concentrating on a visual point will sharpen your focus and increase the likelihood of completing your routine.","titleGetFocused":"Get Focused","activitySkippedText":"<ACTIVITY> skipped!","lastActivitySkippedText":"<ACTIVITY> skipped! You’ve earned your screen time. 💪","buttonSkipHabitText":"Skip this habit for today","buttonPostponeBreakText":"Postpone break for five minutes","breakDurationText":"Break Activites Duration: <DURATION>"},"common":{"emailId":"team@focusbear.io","unlockMachineButtonText":"Unlock the machine","wrapupButtonText":"Let\'s wrap up for the day","stayFocusedText":"OK - Stay focused throughout the day!","letsCreatAccountText":"Now let\'s set up an account for you","buttonAbortText":"Please spare me","buttonCancelText":"Cancel","buttonOkText":"OK","webhookUrl":"https://hooks.zapier.com/hooks/catch/326116/b98ovxc/","buttonExportText":"Export","appName":"Focus Bear","trialExpiredText":"Your trial has expired!","daysRemainingText":"Trial version - <DAYS> of 31 trial days remaining","buttonStatusStateFocusText":"FOCUS","buttonStatusStateOffText":"OFF","buttonStatusStateCallText":"CALL","uninstallConfirmText":"Are you sure you want to giveup all your habits and uninstall Focus Bear?","yesText":"Yes","noText":"No","uninstallDoneText":"All the app related processes will stop and the app will close itself and then you can drag the app and move to trash/bin.","buttonUninstallText":"Uninstall Focus Bear","shutdownNotificationTitle":"It\'s time to wrap up for the day. Your shutdown time is in 5 minutes.","appBlockNotificationTitle":"<APP_NAME> isn\'t allowed in the <FOCUS_NAME> focus mode.","focusBreakNotificationTitle":"Your break ends in","tabGeneralText":"General","tabFocusText":"Focus","tabEditHabitsText":"Edit Habits","tabPasswordText":"Password","tabBlockedURLsText":"Blocked URLs","tabUninstallText":"Uninstall","mondayText":"Monday","tuesdayText":"Tuesday","wednesdayText":"Wednesday","thursdayText":"Thursday","fridayText":"Friday","saturdayText":"Saturday","sundayText":"Sunday","andText":"and","tabAccountsText":"Account","checkInternetText":"Unable to connect to server. Please check your internet connection.","uninstallingText":"Uninstalling..","askUninstallReasonText":"Can you share why you\'re uninstalling?","buttonSelectReasonText":"Select a reason","brokenAppReasonText":"The app is broken","habitsHardReasonText":"My habits are too hard - I can\'t handle them","emailTitle":"Your Email (if you want us to reply):","buttonPostponeText":"Postpone","noPurchasesFoundText":"No purchases found.","someProblemInCredentialText":"There was a problem connecting to the backend server. Please login again.","askUninstallReasonText2":"Damn sorry, it seems like we let you down. We\'re in the early stages of this product and really want to get feedback to make it better. Could you tell us why you\'re uninstalling?","minimumCharacterText":"(Minimum 10 characters)","secondsText":"seconds","minuteText":"minute","minutesText":"minutes","hourText":"hour","hoursText":"hours","timeIncorrectText":"Your system time seems to be incorrect - it\'s saying the current time is <SYSTEM_TIME> but the actual time is <TRUE_TIME>. Focus Bear won\'t work properly if you don\'t have your system time configured correctly. Once you have adjusted the time settings, click \\"I am ready to start my habits\\" button below.","buttonIAmReadyText":"I am ready to start my habits","buttonInstructionsText":"Click Here to see instructions for fixing your time settings","notificationVideoCallText":"Looks like you\'re in a video call. I won\'t interrupt you with micro-breaks during the meeting to avoid embarrassing screensharing moments. Enjoy the meeting!","tabSettingsText":"Settings","tabPomodoroText":"Pomodoro","tabAdvancedText":"Advanced","graphQuantityText":"Quantity","graphMinutesText":"Minutes","graphDateText":"Date","graphTimeText":"Time","buttonBackToMyHabitsText":"Back to my habits","activitiesSyncErrorText":"Focus Bear was not able to sync the activities\' statistics due to bad internet.","alertAppRestartText":"Focus Bear automatically restarts if it gets force quit/crashes to make sure you always have help combatting distractions. If you want to quit the app/take a break, use the Quit option from the Focus Bear menu bar.","buttonDontTellAgainText":"Got it - don\'t tell me again","toolTipColorBoxText":"Choose a color to be displayed in the background of the top menu bar icon to help identify the Focus Mode you are running."},"abortInfo":{"abortingTitle":"Cancelling..","abortingCountDownInfo":{"subTitle":"Are you sure you want to give up on your habits? Please take 10 seconds to reflect on whether you are serious about cancelling.","message":"While you wait, reflect on why you’re doing this. If it was because your morning routine was too ambitious, perhaps scale it back to only be a few minutes long so that it’s easier to do it than not do it. If you’re cancelling because the app is broken, really sorry!!","pleaseEmailText":"Please email","buttonAbortCancelText":"I didn’t mean it. Let me do my habits!"},"abortingConfirmInfo":{"subTitle":"Can you share why you\'re cancelling?","dropDown_0":{"title":"Select a reason"},"dropDown_1":{"title":"I\'ve got an emergency","description":"Uh oh! Hope everything is ok. Restoring access immediately and cancelling habits for next 4 hours.. Your normal routine will resume after that."},"dropDown_2":{"title":"The app is broken","description":"Oh no! We\'re really sorry. We\'ll deactivate all popups. Can you please let us know what happened?﹡","emailTitle":"Your Email (if you want us to reply):","buttonDeactivateText":"Deactivate habit popups"},"dropDown_3":{"title":"My habits are too hard - I can\'t handle them","description":"Ah understandable. Would you like to reset your habits to be 30 seconds each and max 5 minutes? A short morning routine is better than nothing. You can build from there.","buttonStartSmallText":"Yeah - I\'ll start small","buttonDontWantText":"NO I don\'t want a \\nmorning routine at all!","emailTitle":"Your Email (if you want us to reply):","startSmallInfo":{"subTitle":"Starting small..","activityResetText":"We’ve reset your habits and break activities for you. They’re now each only 30 seconds long which should make it more manageable.","activityRemovedText":"We removed a few activities so that the total morning routine is 5 minutes long","changeSettingsText":"You can alter your settings later from the top toolbar icon <icon>","shareFeedbackText":"Can you share some feedback about why your habits were too hard?﹡","buttonTitle":"Start shortened routine"},"givingUpInfo":{"subTitle":"Giving up on your morning routine","description":"No problems. You’re in control.","changeSettingsText":"Feel free to reactivate Focus Bear from top toolbar icon <icon>","shareFeedbackText":"Can you share feedback about the app?﹡","buttonTitle":"Deactivate routine + breaks"}},"dropDown_4":{"title":"Something else","description":"Can you tell us why you want to stop getting habit + break notifications?﹡","emailTitle":"Your Email (if you want us to reply):","buttonDeactivateText":"Deactivate routine + breaks"}},"abortDoneInfo":{"title":"Deactivated","subTitle":"You’ve successfully deactivated Focus Bear. The app won’t show habit prompts until you activate it again from the menu icon. If you deactivated it because of a problem with the app, please email"}},"quitInfo":{"quittingTitle":"Quitting..","quittingCountDownInfo":{"subTitle":"Are you sure you want to Quit? Please take 10 seconds to reflect on whether you are serious about quitting.","message":"While you wait, reflect on why you’re doing this. If it was because your morning routine was too ambitious, perhaps scale it back to only be a few minutes long so that it’s easier to do it than not do it. If you’re deactivating because the app is broken, really sorry!!","pleaseEmailText":"Please email","buttonQuitCancelText":"I didn’t mean it. Let me do my habits!"},"quittingConfirmInfo":{"subTitle":"Can you share why you\'re quitting?","buttonQuitText":"Quit","emailTitle":"Your Email (if you want us to reply):","dropDown_0":{"title":"Select a reason"},"dropDown_1":{"title":"I\'ve got an emergency","description":"Uh oh! Hope everything is ok. Restoring access immediately and quitting app."},"dropDown_2":{"title":"The app is broken","description":"Oh no! We\'re really sorry. Can you please let us know what happened?﹡","finalDescription":"Thanks for letting us know. We\'ll fix it ASAP."},"dropDown_3":{"title":"Something else","description":"Can you tell us why you want to stop getting habit + break notifications?﹡","finalDescription":"Thanks for letting us know. All the best."}},"askQuitVcInfo":{"subTitle":"Do you want to quit the app completely or just take a break for a few hours?","buttonDiableAppText":"Give me a break for 4hrs","buttonQuitText":"Turn it off completely - I\'ll turn it back on when I\'m ready"}},"shutOffTimeInfo":{"title":"Time to wind down","subTitle":"You told me you wanted to stay off your computer from <SHUTOFFTIME> to <STARTTIME>. Enjoy your evening and sleep well. Look forward to helping you with your morning routine tomorrow.","buttonAbortText":"Get access now","shutOffAbortInfo":{"title":"Emergency?","subTitle":"Are you sure you want to do this? Using your computer late at night could mess up your sleep. Please take 30 seconds to reflect on whether this is really an emergency or whether it can wait.","shareFeedbackText":"Feel free to write an explanation here:","buttonUnlockText":"Unlock"},"shutOffAbortDoneInfo":{"subTitle":"Sorry to hear that something bad has happened and you absolutely need to use your computer late at night. We’re unlocking your machine now. Your morning routine will still activate at <STARTTIME>. Hope you’re able to catch up on sleep during the day.","unlockingText":"Unlocking in"}},"settings":{"title":"Enter settings JSON below:","buttonSaveText":"Save","visitText":"Visit <SETTINGURL> to generate settings","settingUrl":"https://settings.focusbear.io","schemaError":"Your settings can not be validated.","buttonOkText":"OK","settingIsNotValidText":"Sorry it seems like your settings aren’t valid. Please generate settings at https://settings.focusbear.io","buttonEditSettingsText":"Edit Habits","buttonAdvancedText":"Advanced","description":"Click on \\"Edit Settings\\" to modify your existing settings.\\nIf you are an advanced user click on \\"Advanced\\" to view or edit settings JSON","settingIsValidText":"Your settings have been validated and will be applied now."},"trialNagInfo":{"title":"Focus Bear","description":"We offer a 31-day trial period, during which you can evaluate Focus Bear at your leisure. The trial is a FULLY functional Trial and you can evaluate all the features.","buttonStartTrialText":"START 31-DAY FREE TRIAL","buttonContinueTrialText":"Continue Trial","buttonRegisterNowText":"Register Now","trialPeriodText":"Trial period","daysRemainingText":"Days Remaining","getLicenseKeyDescription":"if you do not have a license key, get one!","buttonBuyNowText":"Buy now","buttonlicensekeyText":"Enter license key"},"activationNagInfo":{"title":"Focus Bear Activation","description":"Paste License key in the text box below and click Activate to unlock all features.","buttonPasteText":"Click here to paste the copied License Key.","buttonActivateText":"Activate","buttonBuyLicenseText":"Buy License","buttonBackText":"Back","noInternetTitle":"No Internet Connection","noInternetSubTitle":"Make sure your device is connected to the internet.","successfullyActivatedTitle":"Thank You!","successfullyActivatedSubTitle":"You have successfully activated Focus Bear!","buttonOkText":"OK","activationErrorTitle":"Unable to activate.","activationErrorSubTitle":"Please enter a valid License key."},"menuInfo":{"menuItemReactivateTitle":"Reactivate","menuItemEnterLicenseKeyTitle":"Enter License Key","menuItemPreferencesTitle":"Preferences","menuItemExportStatisticsTitle":"Export Statistics","menuItemFocusTitle":"Focus","menuItemHardcorePomodoroModeTitle":"Super Pomodoro Mode","menuItemStartPomodoroTitle":"Start Pomodoro Mode","menuItemStopHardcorePomodoroTitle":"Stop Super Pomodoro Mode","menuItemCheckForUpdatesTitle":"Check for updates","menuItemEnableOfficeModeTitle":"Office Mode Enabled","menuItemDisableOfficeModeTitle":"WFH Mode Enabled","menuItemQuitTitle":"Quit","untilTimeText":"On Until <TIME>","onText":"On","noOfficeFriendlyActivityAlertText":"You don\'t have any office friendly break activities. Do you want me to add one for you to stand up and stretch for 20 seconds?","noOfficeFriendlyActivityButtonFirstText":"Yeah sounds good","noOfficeFriendlyActivityButtonSecondText":"No I\'m a machine! I don\'t need breaks","officeModeEnabledSuccessfullyText":"Ok! I\'ll just prompt you to do activities that won\'t weird other people out (doing handstand pushups in the office might raise a few eyebrows).","menuItemUpgradeNowTitle":"Upgrade Now","subscriptionExpiredText":"Your subscription has expired","menuItemStartBreakTitle":"Start Break","menuItemBrainDumpTitle":"Brain Dump","toolTipOfficeMode":"When you\'re working from the office, I will only give you appropriate break activities (e.g. chair stretches rather than pushups).","toolTipWfhMode":"No-one\'s around! You can do break activities that are a bit more fun (e.g. Dance like no-one\'s watching).","menuItemToolsTitle":"Tools >","menuItemOpenToolboxTitle":"Open Toolbox"},"preferencesInfo":{"titlePomodoro":"Pomodoro Mode:","checkBoxPomodoroText":"Enter Pomodoro mode after completing morning routine","titleReduceMotion":"Reduce motion:","checkBoxReduceMotionText":"Prefer reduced motion (don\'t show animated bears)","titleAskNextHabit":"Next habit reminder:","checkBoxPromptToAskNextHabitText":"Occasionally prompt me to remember the next habit","titleSelectLanguage":"Select Language:","alertChangeLanguageMessageText":"Are you sure you want to change the language to <LANGUAGE>?","buttonAdvancedText":"Advanced","pomodoroModeDurationText":"Pomodoro Mode duration:","minutesText":"minutes","hardCorePomodoroEnabledText":"Super Pomodoro mode enabled to focus on <FOCUSTYPE> for <COUNT> pomodoros on <DAYS>.","hardCorePomodoroNotEnabledText":"Super Pomodoro mode not enabled.","automaticPomodoroNotEnabledText":"Automatic Pomodoro mode is disabled.","reviewFocusModeAlertText":"Please review focus mode settings for super pomodoro mode.","breakDurationText":"Break duration:","titleSurveillance":"Surveillance:","checkBoxSurveillanceText":"I\'m under employer surveillance","descriptionSurveillanceText":"Hide Focus Bear in screenshots","workDurationEmptyErrorText":"Work Duration can not be empty.","workDurationZeroErrorText":"Work Duration can not be 0.","breakDurationEmptyErrorText":"Break Duration can not be empty.","breakDurationZeroErrorText":"Break Duration can not be 0.","versionText":"Version:","titleSound":"Sound:","checkBoxSoundText":"Play sound effects","statisticsText":"Statistics:","updatesText":"Updates:","titleAppMode":"Focus bear mode:","checkBoxCuddlyBearText":"Cuddly Bear mode","descriptionCuddlyBearText":"Cuddly Bear mode: kind and gentle - gives you the benefit of the doubt when you open a non-allowed URL. Lets you temporarily allow blocked URLs during a focus mode.","checkBoxGrizzlyBearText":"Grizzly Bear mode","descriptionGrizzlyBearText":"Grizzly Bear mode: super strict - immediately block URLs that aren\'t allowed and don\'t let yourself allow them until the focus mode is over.","pomodoroDescriptionText":"Pomodoro Mode cycles between deep work blocks where a focus mode is turned on (and distractions turned off) and break periods.","buttonLearnPomodoroTechniqueText":"Learn more about the pomodoro technique here.","titleDockIcon":"Dock icon:","checkBoxShowDockIconText":"Show Dock icon"},"focusPreferencesInfo":{"titleFocusType":"Focus Type:","titleAllowedAllApps":"Allow all apps","titleAllowedSelectedApps":"Allow selected apps","titleAllowedAllUrls":"Allow all urls","titleAllowedSelectedUrls":"Allow selected urls (works with Safari and Chrome only)","noFocusAddedText":"Please add a Focus Type in left panel.","deleteFocusTypeMessageText":"Are you sure you want to delete the selected Focus type?","yesText":"Yes","noText":"No","urlPlaceHolderString":"google.com","invalidDomainText":"Please enter a valid domain.","invalidDomainTextSecond":"If you want to allow all urls please select \\"Allow all urls\\" instead.","buttonCancelText":"Cancel","buttonAddText":"Add","buttonSaveText":"Save","titleAddWebUrl":"Add Web Url","titleEditWebUrl":"Edit Web Url","titleAddFocusType":"Add Focus Type","titleTitle":"Title:","titleColor":"Color:","errorSameFocusType":"Focus type with the same name already exists.","buttonSelectAppText":"Select","appAlreadyExistsText":"Some of the apps selected are already present in the list.","urlAlreadyExistsText":"<APPNAME> already exists in the list.","focusCanNotDeleteTitle":"Can not delete.","focusCanNotDeleteSubTitle":"The Default focus type cannot be deleted.","focusModeOnText":"Focus mode is on. Please deactivate the focus mode to delete it.","duplicateText":"Duplicate","toolTipAdd":"Add","toolTipRemove":"Remove","toolTipDuplicate":"Duplicate","hardCorePomodoroIsOnMessageText":"Super Pomodoro mode is on. Please deactivate super Pomodoro mode to delete it.","buttonAdvancedText":"Advanced","defaultFocusText":"Complete anarchy! Block nothing 😬","meetingsFocusText":"Meetings","disablePomodoroModeAlertText":"The selected focus mode is enabled in super pomodoro mode. Please disable super pomodoro mode to delete this.","buttonAddFocusTypeText":"Add Focus Mode","buttonDeleteFocusTypeText":"Delete","allowUrlInstructionFirstText":"To allow a certain website: domain.com","allowUrlInstructionSecondText":"To allow all subdomains of a website: *.domain.com","allowUrlInstructionThirdText":"To allow any web pages that contain text in the URL or page title: reactnative or React Native","blockUrlInstructionFirstText":"To block a certain website: domain.com","blockUrlInstructionSecondText":"To block all subdomains of a website: *.domain.com","lockedFocusText":"Locked Focus on current activity","titleBlockedAllUrls":"Block all urls","titleBlockedSelectedUrls":"Block selected urls (works with Safari and Chrome only)","titleAllowUrlListApproch":"Block everything except safe sites that I choose","titleBlockUrlListApproch":"Allow everything except certain distracting sites","allowUrlsQuestionText":"How do you want to allow URLs?","blockUrlsQuestionText":"How do you want to block URLs?"},"focusPreferencesAdvancedInfo":{"runScriptBeforeText":"Run apple script before starting focus mode.","runScriptAfterText":"Run apple script after finishing focus mode.","titleCurrentAppleScript":"Current Apple script:","buttonSelectScriptText":"Select Apple script","titleBlockedUrls":"Blocked URLs","selectScriptFileText":"Please select a script file","buttonSelectText":"Select","pleaseSelectScriptText":"Please select a apple script.","toolTipAdd":"Add","toolTipRemove":"Remove","instructionText":"The URLs here will be blocked during this focus mode. Useful if you want to allow some websites but block others. For example, you could have *.google.com as an allowed URL but block tv.google.com","autoOnDoNotDisturbText":"Turn on Do Not Disturb automatically when starting a focus mode.","needDndPermissionText":"To turn on Do Not Disturb when starting a Focus Mode, Focus Bear needs Accessibility permissions. Would you like to give the permissions now?"},"focusInfo":{"focusAlreadyRunningText":"A focus mode is already running. Please deactivate the running focus mode to start a new one.","startingFocusModeInfo":{"buttonStartFocusText":"Start Focus","howMuchTimeText":"How much time do you want to focus for?","hoursText":"hours","minutesText":"minutes","title":"Starting Focus type - <FOCUSTYPE>","questionText":"What do you plan to achieve during this focus block?","onlyAllowSelectedAppText":"You\'ll only be able to use <APP>","onlyAllowSelectedAppAndUrlText":"You\'ll only be able to use \\"<URL>\\" in <APP>","explanationText":"Setting an intention for the focus block helps prime your brain to accomplish that task. To edit the intention after starting the focus mode, click Brain Dump in the menu bar."},"abortingFocusModeInfo":{"title":"Deactivating Focus Block - <FOCUSTYPE>","questionText":"Can you share why you\'re deactivating?","reasonsFirstText":"I achieved what I wanted to too early.","reasonsSecondText":"I have an emergency","reasonsThirdText":"Focus mode is not working properly.","buttonCancelText":"Cancel","buttonAbortFocusText":"Deactivate Focus Block"},"focusCompletedInfo":{"title":"You did it!","subTitle":"You have successfully completed the focus block - <FOCUSTYPE>","questionFirstText":"What did you achieve during this time?","questionSecondText":"Any distractions?","titleIntention":"Your intention was","buttonTakeBreakText":"Take a 5 minute break"},"focusSummaryInfo":{"title":"You completed <COUNT> focus blocks today.","buttonContinueText":"Start Evening Routine","focusTableColumnFirstText":"Focus type","focusTableColumnSecondText":"Start Time","focusTableColumnThirdText":"Duration","focusTableColumnFourthText":"Work Achieved","focusTableColumnFifthText":"Distractions encountered","activityTableColumnFirstText":"Activity","activityTableColumnSecondText":"Total Quantity","activityTableColumnThirdText":"Average","activityTableColumnSixthText":"Total Duration","titleActivitySummaryText":"Activity Summary:","titleFocusSummaryText":"Focus Summary:","totalFocusTimeText":"Total focus time: <TIME>","buttonNeedMoreTimeText":"I need to work for one more minute","buttonStillNeedMoreTimeText":"I still need to work more"},"discourageDefaultFocusInfo":{"title":"Are you sure? It\'s pretty easy to get distracted without using a more restrictive focus mode","buttonCancelText":"Bah I guess you\'re right - CANCEL!","buttonShutUpText":"Shutup I know what I\'m doing","titleGoodLuck":"Ok good luck! (You\'ll need it 😅)"},"suggestFocusInfo":{"title":"Will you need to use other apps during the meeting? If not, I can block everything else to help you concentrate.","subTitle":"On selecting \\"Block everything else\\" the app will start \\"Meetings\\" focus mode.","buttonBlockText":"Block everything else","buttonCancelText":"It\'s ok for me to use other apps during this meeting"}},"pomodoroInfo":{"title":"It\'s time to focus","questionFirstText":"What do you want to achieve in this pomodoro session?","questionSecondText":"Which focus mode do you want to use?","buttonEditFocusModeText":"Edit focus modes","buttonLetsDoItText":"Let\'s do it","buttonHardcorePomodoroText":"Use super pomodoro mode (lock in the focus mode for multiple pomodoros)","howManyPomodoroText":"How many pomodoros you want to focus for:","chooseTheFocusModeText":"Choose the focus mode and duration - you won\'t be able to change the focus mode until the time is up (you still get to use any app/website during the 5 minute break)","alertWarningPaswwordSetText":"To make super pomodoro mode more effective, we recommend setting a password in Preferences (ask someone else to do it for you) otherwise you\'ll still be able to cancel the focus modes before the time is up.","completedPomodoroCountText":"You have completed <COMPLETED_POMODORO> of <TOTAL_POMODORO> pomodoros. <REMAINING_POMODORO> more to go."},"logQuantityInfo":{"title":"Log Quantity of activity","buttonCancelText":"Cancel","buttonOkText":"OK","enterValidValueText":"Please enter a valid value.","quantityIsEmptyText":"Log quantity can not be empty.","logQuantityQuestionText":"How many <activity> did you do?"},"enterPasswordViewInfo":{"title":"Please enter the password to continue","passwordPlaceholderText":"Password","buttonResetPasswordText":"Reset Password","blankPasswordErrorTitle":"Password cannot be blank.","blankPasswordErrorSubTitle":"Please enter a valid password.","incorrectPasswordErrorTitle":"Invalid password.","alertConfirmResetPasswordTitle":"Reset Password","alertConfirmResetPasswordSubTitle":"Your current password will be removed after 24 hours. You can then set a new password. Proceed?","alertPasswordResetDoneTitle":"Password reset in progress","alertPasswordResetDoneSubTitle":"Please set a new password after 24 hours."},"passwordPreferencesInfo":{"titleSetPassword":"Set Password","titleChangePassword":"Change Password","newPasswordPlaceholderText":"New Password","confirmPasswordPlaceholderText":"Confirm Password","infoText":"You can reset the password at any time (but it has a 24hr cooling off period before it resets to stop you from cheating yourself). You\'ll need to provide the password when you cancel your morning/evening routine or super pomodoro mode. You can reset the password at any time - you just have to wait 24hrs.","buttonSetPasswordText":"Set Password","buttonChangePasswordText":"Change Password","passwordNotSetText":"If you\'re struggling to stick to your habits, get a housemate/partner to set a password. You won\'t be able to skip habits without the password.","passwordSetText":"Extra accountability: you have an active password set and can\'t skip your habits without getting a friend to enter the password.","passwordBlankAlertTitle":"Password cannot be blank.","passwordBlankAlertSubTitle":"Please enter a valid password.","confirmPasswordBlankAlertTitle":"Confirm Password cannot be blank.","confirmPasswordBlankAlertSubTitle":"Please enter a valid \\"Confirm password\\".","passwordSetAlertTitle":"Password successfully set.","passwordChagedAlertTitle":"Password successfully changed.","passwordNotMatchAlertTitle":"Passwords do not match.","passwordNotMatchAlertSubTitle":"Confirm Password does not match with the main password. Please re enter.","buttonDisablePasswordText":"Disable Password","passwordDisableAskText":"Are you sure you want to disable your password?","passwordDisableDoneText":"Your password has been disabled."},"blockedUrlsViewInfo":{"title":"Always Blocked URLs","invalidDomainText":"Adding * will block all urls. Please use another combination.","subTitleText":"\\"Block these URLs even if you\'re not in a focus block. You might want to put social media or news sites that you would rather not use at any time. You can always set up an evening routine activity where you explicitly allow access to Facebook so that you can still stay connected - just not during your morning routine/work day.\\""},"rememberNextHabitViewInfo":{"randomPhraseRightChoice1":"Right on!","randomPhraseRightChoice2":"Yeah!","randomPhraseRightChoice3":"You got it!","randomPhraseRightChoice4":"I can just retire now because you know exactly what you\'re doing 🙂","randomPhraseWrongChoice1":"Oops not quite - it\'s <CORRECT_HABIT_NAME>","randomPhraseWrongChoice2":"Almost - it\'s <CORRECT_HABIT_NAME>","title":"What comes next?","description":"I want to make sure you don\'t become too dependent on me. There will be days where you don\'t have access to your computer but that doesn\'t mean you won\'t do your habits. Think of me as training wheels - I\'m here to help you deepen the habits until they become automatic. Let\'s do a quick exercise to make sure you remember how to stack your habits even when I\'m not there.","questionText":"You just completed <LAST_HABIT_NAME>. What habit will you do next?","selectHabitText":"Select Habit","enterToChooseText":"Press enter to choose an option"},"preloadFocusModesViewInfo":{"title":"What type of work do you mainly do?","titleSelectWorkType":"Select work type","titleProgramming":"Programming","titleGraphicDesign":"Graphic Design","titleDataAnalysis":"Data Analysis","titleSomethingElse":"Something else","buttonContinueText":"Continue","workText":"Work","placeholderWorkText":"Rocket Surgery"},"pomodoroPreferencesAdvancedInfo":{"checkBoxUseHardcorePomodoroText":"Use super pomodoro mode","descriptionHardcorePomodoroText":"(Lock in the focus mode for multiple pomodoros)","chooseFocusText":"Choose the focus mode","descriptionChooseFocusFirstText":"You won\'t be able to change the focus mode until the time is up","descriptionChooseFocusSecondText":"(you still get to use any app/website during the 5 minute break)","HowManyPomodoroText":"How many pomodoros you want to focus for:","selectDaysForPomodoroText":"Schedule specific days you want to run the super pomodoro mode after Morning Routine:","buttonApplyText":"Apply","selectAtleastOneDayText":"Please select atleast one day."},"accountVcInfo":{"title":"Your Account Information","titleNameText":"Name:","titleEmailIdText":"Email Id:","buttonLogoutText":"Logout","registeredVersionText":"Subscription active","logoutAlertText":"Are you sure you want to logout?","titleUserIdText":"User Id:","restoreText":"If you\'ve already purchased Focus Bear subscription, you can restore that purchase.","buttonRestoreText":"Sync Payment Status"},"activityPostponeInfo":{"postponeHabitsText":"If you have something urgent, you can postpone Habits for a few minutes.","postponeBreakText":"If you have something urgent, you can postpone the Break Activity for 5 Minutes.","buttonTakeBreakText":"Argh ok I\'ll take a break!","selectMinutesText":"Select minutes to postpone:","buttonCompletelySkipText":"Completely Skip","buttonPostponeHabitText":"Postpone Habit","buttonPostponeBreakText":"Postpone Break","buttonAbortBreakText":"Abort Break Activity","postponedLastBreakText":"You postponed the last break - are you sure you can\'t make time for the break now?","buttonEnableOfficeModeText":"Switch to office mode","officeModeEnableText":"Ok I\'ll give you some break activities that are appropriate to do in an office environment.","postponedLastHabitText":"You\'ve postponed your habits a few times. Are you sure you want to postpone again?","buttonDoHabitText":"I changed my mind - I\'ll do my habits"},"brainDumpVcInfo":{"title":"Focus Bear - Brain dump","titleIntentionText":"Intention:","titleTimeRemainingText":"Time remaining:","titleWorkNoteFirst":"Things I\'ll do in my next break:","titleWorkNoteSecond":"Things you wanted to do in your break:"},"askLogInVcInfo":{"title":"Make healthy habits and deep work the path of least resistance.","messageText":"Sign In with a Focus Bear account to manage your time without thinking about it. Having an account helps you set your computer use hours, create a custom morning and night routine, and customize your focus modes for different activities.","buttonSignInText":"Sign In","buttonSignUpText":"Sign Up"},"upgradeNowVcInfo":{"pointFirstText":"Personalized habit routines","pointSecondText":"Productivity-boosting breaks","pointThirdText":"Customizable focus modes","pointFourthText":"Automatic goal tracking","buttonUpgradeNowText":"Upgrade Now","moneyBackText":"30 days money back guarantee","syncInfoText":"After you pay, click the Sync Payment Status button below","buttonRestoreText":"Sync Payment Status","subscriptionExpiredText":"Your subscription has expired"},"onboardingPostponeVcInfo":{"title":"If you have something urgent, you can postpone the Onboarding process for a few minutes.","selectMinutesText":"Select minutes to postpone:","buttonPostponeText":"Postpone Onboarding"},"welcomeOnboardingVcInfo":{"subTitle":"Welcome aboard!","descriptionFirstText":"Looking forward to helping you form healthy habits and get more deep work done. To start off, we want to show you a demo of how Focus Bear works. It takes 2 minutes and requires 100% attention from you.","descriptionSecondText":"You won\'t be able to use other apps during the onboarding. Do you have time now or shall we do it a bit later?","buttonLaterText":"A bit later please","buttonLetsDoItText":"Let\'s do it","allRightsReservedText":"© 2022 Focus Bear All Rights Reserved.","confirmText":"Just want to double check you are ok to focus 100% on onboarding for the next 2 minutes. The next step is full screen - you won\'t be able to use any other apps during this time.","buttonConfirmLetsDoItText":"You have my full attention","buttonNeedMoreTimeText":"Uhh I need a few more minutes"},"upgradeNowUrl":"https://dashboard.focusbear.io/subscription","customLoginVcInfo":{"titleSignIn":"Sign In","titleSignUp":"Sign Up","subTitleCreateAccount":"Create an account","subTitleWelcomeback":"Welcome back","titleEmailAddress":"Email Address","titlePassword":"Password","titleConfirmPassword":"Confirm your password","buttonSignInText":"Sign In","buttonCreateAccountText":"Create an account","titleEmailIsBlank":"Email cannot be blank.","emailInvalidText":"Please enter a valid Email.","titlePasswordIsBlank":"Password cannot be blank.","passwordInvalidText":"Please enter a valid password.","titleInvalidEmail":"Invalid Email","titleConfirmPasswordBlank":"Confirm password cannot be blank.","confirmPasswordInvalidText":"Please enter a valid \\"Confirm password\\".","titlePasswordNotMatch":"Passwords do not match.","confirmPasswordNotMatchText":"Confirm Password does not match with the main password. Please re enter.","titleSignupFailed":"Signup failed.","titleLoginFailed":"Login failed.","titlePasswordRules":"Password rules:","buttonForgotPasswordText":"Forgot Password","passwordRuleFirstText":"At least 8 characters in length","passwordRuleSecondText":"Contain at least 3 of the following 4 types of characters:","passwordRuleThirdText":"lower case letters (a-z)","passwordRuleFourthText":"upper case letters (A-Z)","passwordRuleFifthText":"numbers (i.e. 0-9)","passwordRuleSixthText":"special characters (e.g. !@#$%^&*)"},"loginHelpVcInfo":{"title":"An incognito window should open where you can Login or Register. If you don\'t see it, please try opening Safari manually. If you still can\'t see it","buttonClickHereText":"Click Here"},"onboardingCardsInfo":{"title":"Important Notes","controllingBrowserText":"Controlling Your Browser","controllingBrowserDescription":"When you next open a browser tab, you\'ll see this popup. The reason we ask for permissions to control your browser is so we can block distracting websites when you activate focus mode.","buttonGotItText":"Got it","titleSignUpSuccessful":"Sign up successful","signupSuccessText":"Great you\'re all signed up. I\'ll just give you a few tips before you start using it.","buildingHabitsText":"Building Better Habits","buildingHabitsDescription":"Focus Bear will help you develop stronger habits in the morning and evening by blocking distractions. But don\'t worry - if you need to access your computer in a hurry, just click the \\"Please spare me\\" button in the top right.","brainBreaksText":"Brain Breaks","brainBreaksDescription":"To avoid screen headaches and neck strain, Focus Bear will encourage you to take breaks at regular intervals. We give you a 30 second warning so you can postpone the break if it\'s a bad time. We also detect if you\'re in a meeting and don\'t show breaks as that might lead to awkward screensharing moments otherwise!","buttonBackText":"Back","buttonNextText":"Next"},"breakWarningVcInfo":{"title":"Your Break starts in","buttonPostponeText":"Postpone for 5 minutes","postponeConfirmText":"You postponed the last break - are you sure you can\'t make time for The break now?","buttonTakeBreakText":"Argh ok I\'ll take a break!"},"askAppWorkVcInfo":{"title":"Welcome to Focus Bear","questionText":"What are your goals?","checkBoxFirstText":"Help me develop healthy habits in the morning (e.g. meditate before starting work) and evening (e.g. have dinner with loved ones)","checkBoxSecondText":"Help me stay focused during the work day","buttonContinueText":"Continue"},"toolBoxVcInfo":{"title":"The toolbox makes it easy to open the apps and websites that you\'ve allowed in the <FOCUS_NAME> focus mode. You can access it from the Menu under Tools.","checkBoxText":"Don\'t show this anymore when I start a focus block","appsText":"Apps:","urlsText":"Urls:","windowTitleText":"Focus Bear - Toolbox"},"skipHabitVcInfo":{"title":"Skipping habit in","buttonDoHabitsText":"I changed my mind - I\'ll do my habits"},"popUpBlockConfirmVcInfo":{"title":"Do you need to use <URL> when you\'re focusing on <FOCUSTYPE>?","buttonAllowText":"Yes - just this time","buttonBlockText":"No - I was getting distracted","buttonEditSettingsText":"Edit Settings"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(186);
const flat = __nccwpck_require__(681);

try {
  const config_es = __nccwpck_require__(8);
  const config_en = __nccwpck_require__(626);
  const en_keys = Object.keys(flat(config_en));
  const es_keys = Object.keys(flat(config_es));

  let not_found_keys = [];
  en_keys.forEach((key) => {
    if (!es_keys.includes(key)) {
      not_found_keys.push(key);
    }
  });

  if (not_found_keys.length > 0) {
    let errorMessage = ``;
    if (not_found_keys.length === 1) {
      errorMessage += `Key: `;
    } else {
      errorMessage += `Keys: `;
    }
    errorMessage += JSON.stringify(...not_found_keys);
    errorMessage += ` not found in config-es.json.`;
    core.setFailed(errorMessage);
  } else {
    core.info("All keys are the same in both config files");
  }
} catch (error) {
  core.setFailed(error.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;