"use strict";(self.webpackChunkreact_ulbitv_ultimate=self.webpackChunkreact_ulbitv_ultimate||[]).push([[38],{"./src/pages/MainPage/ui/MainPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Dark:()=>Dark,Light:()=>Light,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MainPage_stories});var ThemeDecorator=__webpack_require__("./src/shared/config/storybook/ThemeDecorator/ThemeDecorator.tsx"),ThemeProvider=__webpack_require__("./src/app/providers/ThemeProvider/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),Button=__webpack_require__("./src/shared/ui/Button/Button.tsx");function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit(arr,i){var _s,_e,_i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}}function _non_iterable_rest(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array(arr,i){return _array_with_holes(arr)||_iterable_to_array_limit(arr,i)||_unsupported_iterable_to_array(arr,i)||_non_iterable_rest()}function _unsupported_iterable_to_array(o,minLen){if(o){if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if("Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}}var BugButton=function(){var _useState=_sliced_to_array((0,react.useState)(!1),2),error=_useState[0],setError=_useState[1];return(0,react.useEffect)(function(){if(error)throw Error()},[error]),(0,jsx_runtime.jsx)(Button.$,{onClick:function(){return setError(!0)},children:"Throw Error"})};try{BugButton.displayName="BugButton",BugButton.__docgenInfo={description:"",displayName:"BugButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/app/providers/ErrorBoundary/ui/BugButton.tsx#BugButton"]={docgenInfo:BugButton.__docgenInfo,name:"BugButton",path:"src/app/providers/ErrorBoundary/ui/BugButton.tsx#BugButton"})}catch(__react_docgen_typescript_loader_error){}var PageError=__webpack_require__("./src/widgets/PageError/ui/PageError.tsx");function _assert_this_initialized(self1){if(void 0===self1)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return self1}function _class_call_check(instance,Constructor){if(!(instance instanceof Constructor))throw TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _create_class(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}function _get_prototype_of(o){return(_get_prototype_of=Object.setPrototypeOf?Object.getPrototypeOf:function getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_set_prototype_of(subClass,superClass)}function _possible_constructor_return(self1,call){return call&&("object"===_type_of(call)||"function"==typeof call)?call:_assert_this_initialized(self1)}function _set_prototype_of(o,p){return(_set_prototype_of=Object.setPrototypeOf||function setPrototypeOf(o,p){return o.__proto__=p,o})(o,p)}function _type_of(obj){return obj&&"undefined"!=typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj}function _is_native_reflect_construct(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _create_super(Derived){var hasNativeReflectConstruct=_is_native_reflect_construct();return function _createSuperInternal(){var result,Super=_get_prototype_of(Derived);return result=hasNativeReflectConstruct?Reflect.construct(Super,arguments,_get_prototype_of(this).constructor):Super.apply(this,arguments),_possible_constructor_return(this,result)}}var ErrorBoundary=function(_React_Component){_inherits(ErrorBoundary,_React_Component);var _super=_create_super(ErrorBoundary);function ErrorBoundary(props){var _this;return _class_call_check(this,ErrorBoundary),(_this=_super.call(this,props)).state={hasError:!1},_this}return _create_class(ErrorBoundary,[{key:"componentDidCatch",value:function componentDidCatch(error,errorInfo){console.log(error,errorInfo)}},{key:"render",value:function render(){var hasError=this.state.hasError,children=this.props.children;return hasError?(0,jsx_runtime.jsx)(react.Suspense,{fallback:"",children:(0,jsx_runtime.jsx)(PageError.A,{})}):children}}],[{key:"getDerivedStateFromError",value:function getDerivedStateFromError(error){return{hasError:!0}}}]),ErrorBoundary}(react.Component);try{ErrorBoundary.displayName="ErrorBoundary",ErrorBoundary.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/app/providers/ErrorBoundary/ui/ErrorBoundary.tsx#ErrorBoundary"]={docgenInfo:ErrorBoundary.__docgenInfo,name:"ErrorBoundary",path:"src/app/providers/ErrorBoundary/ui/ErrorBoundary.tsx#ErrorBoundary"})}catch(__react_docgen_typescript_loader_error){}var useTranslation=__webpack_require__("./node_modules/react-i18next/dist/es/useTranslation.js");let MainPage_stories={title:"page/MainPage",component:function(){var t=(0,useTranslation.B)("main").t;return(0,jsx_runtime.jsxs)("div",{children:[t("Главная страница"),(0,jsx_runtime.jsx)(BugButton,{})]})},tags:["autodocs"]};var Light={args:{}},Dark={args:{}};Dark.decorators=[(0,ThemeDecorator.n)(ThemeProvider.Sx.DARK)],Light.parameters={...Light.parameters,docs:{...Light.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Light.parameters?.docs?.source}}},Dark.parameters={...Dark.parameters,docs:{...Dark.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Dark.parameters?.docs?.source}}};let __namedExportsOrder=["Light","Dark"]}}]);