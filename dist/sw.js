if(!self.define){let e,i={};const c=(c,a)=>(c=new URL(c+".js",a).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let b={};const o=e=>c(e,s),r={module:{uri:s},exports:b,require:o};i[s]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(n(...e),b)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-580fbd58.css",revision:null},{url:"assets/index-b32ecb97.js",revision:null},{url:"favicon.ico",revision:"881450c6423bff6e643bc2b9246046d9"},{url:"images/apple-touch-icon.png",revision:"fe93d893614a5555c8dc8ba7e85bfb23"},{url:"images/favicon-16x16.png",revision:"b522c2bdc083c3c7c2fbc14ed8b71029"},{url:"images/favicon-32x32.png",revision:"03e68bcea98ec9f4f4dc6641483218a8"},{url:"images/favicon.ico",revision:"9c667907ba29e666473d6f19aca666e8"},{url:"images/maskable_icon_x128.png",revision:"aea38ca680385134266525cc5b6e6cc0"},{url:"images/maskable_icon_x192.png",revision:"c58cd5c791d0f6adb1b6f111db5d5c2f"},{url:"images/maskable_icon_x384.png",revision:"9e5415b67bbfe1eb2ff455a9d3af5b00"},{url:"images/maskable_icon_x48.png",revision:"78a61d35b7e7f5b640d492777ac91dba"},{url:"images/maskable_icon_x512.png",revision:"d38f185a26345f9fe1e3b105e7dc7af4"},{url:"images/maskable_icon_x72.png",revision:"ab611501b6c9cd60cb83daf21ea42dcc"},{url:"images/maskable_icon_x96.png",revision:"876eb2b031730ec19f7bf44fd1a067e2"},{url:"index.html",revision:"df2f82979280568cf25ad48d5eac3e84"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"881450c6423bff6e643bc2b9246046d9"},{url:"images/apple-touch-icon.png",revision:"fe93d893614a5555c8dc8ba7e85bfb23"},{url:"images/favicon-16x16.png",revision:"b522c2bdc083c3c7c2fbc14ed8b71029"},{url:"images/favicon-32x32.png",revision:"03e68bcea98ec9f4f4dc6641483218a8"},{url:"images/maskable_icon_x128.png",revision:"aea38ca680385134266525cc5b6e6cc0"},{url:"images/maskable_icon_x192.png",revision:"c58cd5c791d0f6adb1b6f111db5d5c2f"},{url:"images/maskable_icon_x384.png",revision:"9e5415b67bbfe1eb2ff455a9d3af5b00"},{url:"images/maskable_icon_x48.png",revision:"78a61d35b7e7f5b640d492777ac91dba"},{url:"images/maskable_icon_x512.png",revision:"d38f185a26345f9fe1e3b105e7dc7af4"},{url:"images/maskable_icon_x72.png",revision:"ab611501b6c9cd60cb83daf21ea42dcc"},{url:"images/maskable_icon_x96.png",revision:"876eb2b031730ec19f7bf44fd1a067e2"},{url:"manifest.webmanifest",revision:"e49ad8d5f20df14b928a555bdc92a6c7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
