!function(a){function b(a,b){var c=a[0]-b[0],d=a[1]-b[1];return c*c+d*d}function c(a,b,c){return Math.min(c,Math.max(a,b))}function d(a,b,c){return{x:Math.cos(c)*a-Math.sin(c)*b,y:Math.sin(c)*a+Math.cos(c)*b}}function e(a,b,c){a.addEventListener(b,c,!1)}function f(a){a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.returnValue=!1}var g=function(a,b,c){var d=j.createElement("CANVAS");d.style.position="absolute",d.width=b,d.height=c,a.appendChild(d);var e,f={antialias:!0,depth:!0,premultipliedAlpha:!1};try{e=d.getContext("webgl",f)}catch(h){}if(!e)try{e=d.getContext("experimental-webgl",f)}catch(h){}if(!e)throw new Error("WebGL not supported");return d.addEventListener("webglcontextlost",function(a){console.warn("context lost")}),d.addEventListener("webglcontextrestored",function(a){console.warn("context restored")}),e.viewport(0,0,b,c),e.cullFace(e.BACK),e.enable(e.CULL_FACE),e.enable(e.DEPTH_TEST),e.clearColor(.5,.5,.5,1),g.use(e)};g.use=function(a){return function(b){var c={};return c.context=a,c.start=function(a){return setInterval(function(){requestAnimationFrame(a)},17)},c.stop=function(a){clearInterval(a)},c.destroy=function(a){a.canvas.parentNode.removeChild(a.canvas),a.canvas=null},c.util={},c.util.nextPowerOf2=function(a){return a--,a|=a>>1,a|=a>>2,a|=a>>4,a|=a>>8,a|=a>>16,a++,a},c.util.calcNormal=function(a,b,c,d,e,f,g,h,i){var j=a-d,k=b-e,l=c-f,m=d-g,n=e-h,o=f-i,p=k*o-l*n,q=l*m-j*o,r=j*n-k*m;return this.calcUnit(p,q,r)},c.util.calcUnit=function(a,b,c){var d=Math.sqrt(a*a+b*b+c*c);return 0===d&&(d=1e-5),[a/d,b/d,c/d]},c.Buffer=function(a,c){this.id=b.createBuffer(),this.itemSize=a,this.numItems=c.length/a,b.bindBuffer(b.ARRAY_BUFFER,this.id),b.bufferData(b.ARRAY_BUFFER,c,b.STATIC_DRAW),c=null},c.Buffer.prototype={enable:function(){b.bindBuffer(b.ARRAY_BUFFER,this.id)},destroy:function(){b.deleteBuffer(this.id)}},c.Framebuffer=function(a,b){this.setSize(a,b)},c.Framebuffer.prototype={setSize:function(a,d){this.frameBuffer=b.createFramebuffer(),b.bindFramebuffer(b.FRAMEBUFFER,this.frameBuffer),this.width=a,this.height=d;var e=c.util.nextPowerOf2(Math.max(this.width,this.height));if(this.renderBuffer=b.createRenderbuffer(),b.bindRenderbuffer(b.RENDERBUFFER,this.renderBuffer),b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,e,e),this.renderTexture&&this.renderTexture.destroy(),this.renderTexture=new c.texture.Data(e),b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,this.renderBuffer),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,this.renderTexture.id,0),b.checkFramebufferStatus(b.FRAMEBUFFER)!==b.FRAMEBUFFER_COMPLETE)throw new Error("This combination of framebuffer attachments does not work");b.bindRenderbuffer(b.RENDERBUFFER,null),b.bindFramebuffer(b.FRAMEBUFFER,null)},enable:function(){b.bindFramebuffer(b.FRAMEBUFFER,this.frameBuffer),b.bindRenderbuffer(b.RENDERBUFFER,this.renderBuffer)},disable:function(){b.bindFramebuffer(b.FRAMEBUFFER,null),b.bindRenderbuffer(b.RENDERBUFFER,null)},getData:function(){var a=new Uint8Array(this.width*this.height*4);return b.readPixels(0,0,this.width,this.height,b.RGBA,b.UNSIGNED_BYTE,a),a},destroy:function(){this.renderTexture&&this.renderTexture.destroy()}},c.Shader=function(a){if(this.id=b.createProgram(),this.attach(b.VERTEX_SHADER,a.vertexShader),this.attach(b.FRAGMENT_SHADER,a.fragmentShader),b.linkProgram(this.id),!b.getProgramParameter(this.id,b.LINK_STATUS))throw new Error(b.getProgramParameter(this.id,b.VALIDATE_STATUS)+"\n"+b.getError());this.attributeNames=a.attributes,this.uniformNames=a.uniforms},c.Shader.prototype={locateAttribute:function(a){var c=b.getAttribLocation(this.id,a);return 0>c?void console.error('unable to locate attribute "'+a+'" in shader'):(b.enableVertexAttribArray(c),void(this.attributes[a]=c))},locateUniform:function(a){var c=b.getUniformLocation(this.id,a);return 0>c?void console.error('unable to locate uniform "'+a+'" in shader'):void(this.uniforms[a]=c)},attach:function(a,c){var d=b.createShader(a);if(b.shaderSource(d,c),b.compileShader(d),!b.getShaderParameter(d,b.COMPILE_STATUS))throw new Error(b.getShaderInfoLog(d));b.attachShader(this.id,d)},enable:function(){b.useProgram(this.id);var a;if(this.attributeNames)for(this.attributes={},a=0;a<this.attributeNames.length;a++)this.locateAttribute(this.attributeNames[a]);if(this.uniformNames)for(this.uniforms={},a=0;a<this.uniformNames.length;a++)this.locateUniform(this.uniformNames[a]);return this},disable:function(){if(this.attributes)for(var a in this.attributes)b.disableVertexAttribArray(this.attributes[a]);this.attributes=null,this.uniforms=null},destroy:function(){}},c.Matrix=function(a){a?this.data=new Float32Array(a):this.identity()},function(){function a(a){return a*Math.PI/180}function b(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=b[9],n=b[10],o=b[11],p=b[12],q=b[13],r=b[14],s=b[15],t=c[0],u=c[1],v=c[2],w=c[3],x=c[4],y=c[5],z=c[6],A=c[7],B=c[8],C=c[9],D=c[10],E=c[11],F=c[12],G=c[13],H=c[14],I=c[15];a[0]=d*t+e*x+f*B+g*F,a[1]=d*u+e*y+f*C+g*G,a[2]=d*v+e*z+f*D+g*H,a[3]=d*w+e*A+f*E+g*I,a[4]=h*t+i*x+j*B+k*F,a[5]=h*u+i*y+j*C+k*G,a[6]=h*v+i*z+j*D+k*H,a[7]=h*w+i*A+j*E+k*I,a[8]=l*t+m*x+n*B+o*F,a[9]=l*u+m*y+n*C+o*G,a[10]=l*v+m*z+n*D+o*H,a[11]=l*w+m*A+n*E+o*I,a[12]=p*t+q*x+r*B+s*F,a[13]=p*u+q*y+r*C+s*G,a[14]=p*v+q*z+r*D+s*H,a[15]=p*w+q*A+r*E+s*I}c.Matrix.prototype={identity:function(){return this.data=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},multiply:function(a){return b(this.data,this.data,a.data),this},translate:function(a,c,d){return b(this.data,this.data,[1,0,0,0,0,1,0,0,0,0,1,0,a,c,d,1]),this},rotateX:function(c){var d=a(c),e=Math.cos(d),f=Math.sin(d);return b(this.data,this.data,[1,0,0,0,0,e,f,0,0,-f,e,0,0,0,0,1]),this},rotateY:function(c){var d=a(c),e=Math.cos(d),f=Math.sin(d);return b(this.data,this.data,[e,0,-f,0,0,1,0,0,f,0,e,0,0,0,0,1]),this},rotateZ:function(c){var d=a(c),e=Math.cos(d),f=Math.sin(d);return b(this.data,this.data,[e,-f,0,0,f,e,0,0,0,0,1,0,0,0,0,1]),this},scale:function(a,c,d){return b(this.data,this.data,[a,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1]),this}},c.Matrix.multiply=function(a,c){var d=new Float32Array(16);return b(d,a.data,c.data),d},c.Matrix.Perspective=function(a,b,d,e){var f=1/Math.tan(a*(Math.PI/180)/2),g=1/(d-e);return new c.Matrix([f/b,0,0,0,0,f,0,0,0,0,(e+d)*g,-1,0,0,2*e*d*g,0])},c.Matrix.invert3=function(a){var b=a[0],c=a[1],d=a[2],e=a[4],f=a[5],g=a[6],h=a[8],i=a[9],j=a[10],k=j*f-g*i,l=-j*e+g*h,m=i*e-f*h,n=b*k+c*l+d*m;return n?(n=1/n,[k*n,(-j*c+d*i)*n,(g*c-d*f)*n,l*n,(j*b-d*h)*n,(-g*b+d*e)*n,m*n,(-i*b+c*h)*n,(f*b-c*e)*n]):null},c.Matrix.transpose=function(a){return new Float32Array([a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8]])},c.Matrix.transform=function(a){var b=a[12],c=a[13],d=a[14],e=a[15];return{x:(b/e+1)/2,y:(c/e+1)/2,z:(d/e+1)/2}},c.Matrix.invert=function(a){var b=new Float32Array(16),c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],m=a[10],n=a[11],o=a[12],p=a[13],q=a[14],r=a[15],s=c*h-d*g,t=c*i-e*g,u=c*j-f*g,v=d*i-e*h,w=d*j-f*h,x=e*j-f*i,y=k*p-l*o,z=k*q-m*o,A=k*r-n*o,B=l*q-m*p,C=l*r-n*p,D=m*r-n*q,E=s*D-t*C+u*B+v*A-w*z+x*y;if(E)return E=1/E,b[0]=(h*D-i*C+j*B)*E,b[1]=(e*C-d*D-f*B)*E,b[2]=(p*x-q*w+r*v)*E,b[3]=(m*w-l*x-n*v)*E,b[4]=(i*A-g*D-j*z)*E,b[5]=(c*D-e*A+f*z)*E,b[6]=(q*u-o*x-r*t)*E,b[7]=(k*x-m*u+n*t)*E,b[8]=(g*C-h*A+j*y)*E,b[9]=(d*A-c*C-f*y)*E,b[10]=(o*w-p*u+r*s)*E,b[11]=(l*u-k*w-n*s)*E,b[12]=(h*z-g*B-i*y)*E,b[13]=(c*B-d*z+e*y)*E,b[14]=(p*t-o*v-q*s)*E,b[15]=(k*v-l*t+m*s)*E,b}}(),c.texture={},c.texture.Image=function(a,c){this.id=b.createTexture(),b.bindTexture(b.TEXTURE_2D,this.id),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR_MIPMAP_NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!0),b.bindTexture(b.TEXTURE_2D,null);var d=new Image;d.crossOrigin="*",d.onload=function(){var a=b.getParameter(b.MAX_TEXTURE_SIZE);if(d.width>a||d.height>a){var e=a,f=a,g=d.width/d.height;1>g?e=Math.round(f*g):f=Math.round(e/g);var h=j.createElement("CANVAS");h.width=e,h.height=f;var i=h.getContext("2d");i.drawImage(d,0,0,h.width,h.height),d=h}this.id?(b.bindTexture(b.TEXTURE_2D,this.id),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,d),b.generateMipmap(b.TEXTURE_2D),b.bindTexture(b.TEXTURE_2D,null)):d=null,c&&c(d)}.bind(this),d.onerror=function(){c&&c()},d.src=a},c.texture.Image.prototype={enable:function(a){this.id&&(b.bindTexture(b.TEXTURE_2D,this.id),b.activeTexture(b.TEXTURE0+(a||0)))},disable:function(){b.bindTexture(b.TEXTURE_2D,null)},destroy:function(){b.bindTexture(b.TEXTURE_2D,null),b.deleteTexture(this.id),this.id=null}},c.texture.Data=function(a,c,d){this.id=b.createTexture(),b.bindTexture(b.TEXTURE_2D,this.id),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);var e=null;if(c){var f=a*a*4;e=new Uint8Array(f),e.set(c.subarray(0,f))}b.texImage2D(b.TEXTURE_2D,0,b.RGBA,a,a,0,b.RGBA,b.UNSIGNED_BYTE,e),b.bindTexture(b.TEXTURE_2D,null)},c.texture.Data.prototype={enable:function(a){b.bindTexture(b.TEXTURE_2D,this.id),b.activeTexture(b.TEXTURE0+(a||0))},disable:function(){b.bindTexture(b.TEXTURE_2D,null)},destroy:function(){b.bindTexture(b.TEXTURE_2D,null),b.deleteTexture(this.id)}},c.mesh={},c.mesh.addQuad=function(a,b,c,d,e,f){this.addTriangle(a,b,c,d,f),this.addTriangle(a,d,e,b,f)},c.mesh.addTriangle=function(a,b,d,e,f){a.vertices.push(b[0],b[1],b[2],d[0],d[1],d[2],e[0],e[1],e[2]);var g=c.util.calcNormal(b[0],b[1],b[2],d[0],d[1],d[2],e[0],e[1],e[2]);a.normals.push(g[0],g[1],g[2],g[0],g[1],g[2],g[0],g[1],g[2]),a.colors.push(f[0],f[1],f[2],f[3],f[0],f[1],f[2],f[3],f[0],f[1],f[2],f[3])},c.mesh.Triangle=function(a,b){var d={vertices:[],normals:[],colors:[]},e=[-a/2,-a/2,0],f=[a/2,-a/2,0],g=[a/2,a/2,0];c.mesh.addTriangle(d,e,f,g,b),this.vertexBuffer=new c.Buffer(3,new Float32Array(d.vertices)),this.normalBuffer=new c.Buffer(3,new Float32Array(d.normals)),this.colorBuffer=new c.Buffer(4,new Float32Array(d.colors)),this.transform=new c.Matrix},c.mesh.Plane=function(a,b){var d={vertices:[],normals:[],colors:[]},e=[-a/2,-a/2,0],f=[a/2,-a/2,0],g=[a/2,a/2,0],h=[-a/2,a/2,0];c.mesh.addQuad(d,e,f,g,h,b),this.vertexBuffer=new c.Buffer(3,new Float32Array(d.vertices)),this.normalBuffer=new c.Buffer(3,new Float32Array(d.normals)),this.colorBuffer=new c.Buffer(4,new Float32Array(d.colors)),this.transform=new c.Matrix},c.mesh.Cube=function(a,b){var d={vertices:[],normals:[],colors:[]},e=[-a/2,-a/2,-a/2],f=[a/2,-a/2,-a/2],g=[a/2,a/2,-a/2],h=[-a/2,a/2,-a/2],i=[-a/2,-a/2,a/2],j=[a/2,-a/2,a/2],k=[a/2,a/2,a/2],l=[-a/2,a/2,a/2];c.mesh.addQuad(d,e,f,g,h,b),c.mesh.addQuad(d,i,j,k,l,b),c.mesh.addQuad(d,e,f,j,i,b),c.mesh.addQuad(d,f,g,k,j,b),c.mesh.addQuad(d,g,h,l,k,b),c.mesh.addQuad(d,h,e,i,l,b),this.vertexBuffer=new c.Buffer(3,new Float32Array(d.vertices)),this.normalBuffer=new c.Buffer(3,new Float32Array(d.normals)),this.colorBuffer=new c.Buffer(4,new Float32Array(d.colors)),this.transform=new c.Matrix},c}(a)},"function"==typeof define?define([],g):"object"==typeof exports?module.exports=g:a.GLX=g;var h,i=function(a){function b(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a}function c(a,b){return Math.min(b,Math.max(0,a))}var d={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",grey:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#ffa500",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00"},e=function(a,b,c,d){this.H=a,this.S=b,this.L=c,this.A=d};return e.parse=function(a){var b,c=0,e=0,f=0,g=1;if(a=(""+a).toLowerCase(),a=d[a]||a,b=a.match(/^#(\w{2})(\w{2})(\w{2})$/))c=parseInt(b[1],16),e=parseInt(b[2],16),f=parseInt(b[3],16);else{if(!(b=a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/)))return;c=parseInt(b[1],10),e=parseInt(b[2],10),f=parseInt(b[3],10),g=b[4]?parseFloat(b[5]):1}return this.fromRGBA(c,e,f,g)},e.fromRGBA=function(a,b,c,d){"object"==typeof a?(b=a.g/255,c=a.b/255,d=void 0!==a.a?a.a:1,a=a.r/255):(a/=255,b/=255,c/=255,d=void 0!==d?d:1);var f,g,h=Math.max(a,b,c),i=Math.min(a,b,c),j=(h+i)/2,k=h-i;if(k){switch(g=j>.5?k/(2-h-i):k/(h+i),h){case a:f=(b-c)/k+(c>b?6:0);break;case b:f=(c-a)/k+2;break;case c:f=(a-b)/k+4}f*=60}else f=g=0;return new e(f,g,j,d)},e.prototype={toRGBA:function(a){var d=c(this.H,360),e=c(this.S,1),f=c(this.L,1),g={a:c(this.A,1)};if(0===e)g.r=f,g.g=f,g.b=f;else{var h=.5>f?f*(1+e):f+e-f*e,i=2*f-h;d/=360,g.r=b(i,h,d+1/3),g.g=b(i,h,d),g.b=b(i,h,d-1/3)}return a?g:{r:Math.round(255*g.r),g:Math.round(255*g.g),b:Math.round(255*g.b),a:g.a}},toString:function(){var a=this.toRGBA();return 1===a.a?"#"+((1<<24)+(a.r<<16)+(a.g<<8)+a.b).toString(16).slice(1,7):"rgba("+[a.r,a.g,a.b,a.a.toFixed(2)].join(",")+")"},hue:function(a){return new e(this.H*a,this.S,this.L,this.A)},saturation:function(a){return new e(this.H,this.S*a,this.L,this.A)},lightness:function(a){return new e(this.H,this.S,this.L*a,this.A)},alpha:function(a){return new e(this.H,this.S,this.L,this.A*a)}},e}(this),j=a.document,k="#f0f8ff",l=function(a,b){this.container="string"==typeof a?j.getElementById(a):a,b=b||{},this.container.classList.add("glmap-container"),this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,h=new g(this.container,this.width,this.height),this.minZoom=parseFloat(b.minZoom)||10,this.maxZoom=parseFloat(b.maxZoom)||20,this.maxZoom<this.minZoom&&(this.maxZoom=this.minZoom),this.center={x:0,y:0},this.zoom=0,this.listeners={},this.restoreState(b),b.state&&(this.persistState(),this.on("change",function(){this.persistState()}.bind(this))),this.fogColor=i.parse(b.fogColor||k).toRGBA(!0),this.interaction=new n(this,this.container),this.layers=new q(this),this.renderer=new o(this),b.disabled&&this.setDisabled(!0),this.attribution=b.attribution?[b.attribution]:[],this.attributionDiv=j.createElement("DIV"),this.attributionDiv.className="glmap-attribution",this.container.appendChild(this.attributionDiv),this.updateAttribution(),this.renderer.start()};l.TILE_SIZE=256,l.prototype={updateAttribution:function(){var a=this.layers.getAttribution();this.attribution&&a.unshift(this.attribution),this.attributionDiv.innerHTML=a.join(" &middot; ")},restoreState:function(a){var b=location.search,c={};b&&b.substring(1).replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(a,b,d){b&&(c[b]=d)});var d;void 0!==c.lat&&void 0!==c.lon&&(d={latitude:parseFloat(c.lat),longitude:parseFloat(c.lon)}),this.setPosition(d||a.position||{latitude:52.52,longitude:13.41});var e;void 0!==c.zoom&&(e=void 0!==c.zoom?parseFloat(c.zoom):null),this.setZoom(e||a.zoom||this.minZoom);var f;void 0!==c.rotation&&(f=parseFloat(c.rotation)),this.setRotation(f||a.rotation||0);var g;void 0!==c.tilt&&(g=parseFloat(c.tilt)),this.setTilt(g||a.tilt||0)},persistState:function(){history.replaceState&&(this.stateDebounce||(this.stateDebounce=setTimeout(function(){this.stateDebounce=null;var a=[];a.push("lat="+this.position.latitude.toFixed(5)),a.push("lon="+this.position.longitude.toFixed(5)),a.push("zoom="+this.zoom.toFixed(1)),a.push("tilt="+this.tilt.toFixed(1)),a.push("rotation="+this.rotation.toFixed(1)),history.replaceState({},"","?"+a.join("&"))}.bind(this),1e3)))},setCenter:function(a){(this.center.x!==a.x||this.center.y!==a.y)&&(this.center=a,this.position=this.unproject(a.x,a.y,l.TILE_SIZE*Math.pow(2,this.zoom)),this.emit("change"))},emit:function(a,b){if(this.listeners[a]){var c=this.listeners[a];c.timer||(c.timer=setTimeout(function(){for(var a=0,d=c.fn.length;d>a;a++)c.fn[a](b);c.timer=null}.bind(this),17))}},getContext:function(){return h.context},on:function(a,b){return this.listeners[a]||(this.listeners[a]={fn:[]}),this.listeners[a].fn.push(b),this},off:function(a,b){},setDisabled:function(a){return this.interaction.disabled=!!a,this},isDisabled:function(){return!!this.interaction.disabled},project:function(a,b,c){var d=b/360+.5,e=Math.min(1,Math.max(0,.5-Math.log(Math.tan(Math.PI/4+Math.PI/2*a/180))/Math.PI/2));return{x:d*c,y:e*c}},unproject:function(a,b,c){return a/=c,b/=c,{latitude:(2*Math.atan(Math.exp(Math.PI*(1-2*b)))-Math.PI/2)*(180/Math.PI),longitude:360*a-180}},transform:function(a,b,c){var d=this.project(a,b,l.TILE_SIZE*Math.pow(2,this.zoom)),e=d.x-this.center.x,f=d.y-this.center.y,g=1/Math.pow(2,16-this.zoom),i=(new h.Matrix).translate(0,0,c).scale(g,g,g*HEIGHT_SCALE).translate(e,f,0),j=h.Matrix.multiply(i,this.renderer.vpMatrix),k=h.Matrix.transform(j);return{x:k.x*this.width,y:this.height-k.y*this.height,z:k.z}},getBounds:function(){var a=this.width/2,b=this.height/2,c=this.rotation*Math.PI/180,d=Math.cos(c)*a-Math.sin(c)*b,e=Math.sin(c)*a+Math.cos(c)*b,f=this.center,g=l.TILE_SIZE*Math.pow(2,this.zoom),h=this.unproject(f.x-d,f.y-e,g),i=this.unproject(f.x+d,f.y+e,g);return{n:h.latitude,w:h.longitude,s:i.latitude,e:i.longitude}},setZoom:function(a,b){if(a=c(parseFloat(a),this.minZoom,this.maxZoom),this.zoom!==a){var d=Math.pow(2,a-this.zoom);if(this.zoom=a,b){var e=this.container.offsetWidth/2-b.clientX,f=this.container.offsetHeight/2-b.clientY;this.center.x-=e,this.center.y-=f,this.center.x*=d,this.center.y*=d,this.center.x+=e,this.center.y+=f}else this.center.x*=d,this.center.y*=d;this.emit("change")}return this},getZoom:function(){return this.zoom},setPosition:function(a){var b=c(parseFloat(a.latitude),-90,90),d=c(parseFloat(a.longitude),-180,180),e=this.project(b,d,l.TILE_SIZE*Math.pow(2,this.zoom));return this.setCenter(e),this},getPosition:function(){return this.position},setSize:function(a){return(a.width!==this.width||a.height!==this.height)&&(h.context.canvas.width=this.width=a.width,h.context.canvas.height=this.height=a.height,this.emit("resize")),this},getSize:function(){return{width:this.width,height:this.height}},setRotation:function(a){return a=parseFloat(a)%360,this.rotation!==a&&(this.rotation=a,this.emit("change")),this},getRotation:function(){return this.rotation},setTilt:function(a){return a=c(parseFloat(a),0,60),this.tilt!==a&&(this.tilt=a,this.emit("change")),this},getTilt:function(){return this.tilt},getMatrix:function(){return this.renderer.vpMatrix},getFogRadius:function(){return this.renderer.fogRadius},addLayer:function(a){return this.layers.add(a),this.updateAttribution(),this},removeLayer:function(a){this.layers.remove(a),this.updateAttribution()},destroy:function(){this.listeners=null,this.interaction.destroy(),this.layers.destroy(),this.renderer.destroy()}},"function"==typeof a.define?a.define([],l):"object"==typeof a.exports?a.module.exports=l:a.GLMap=l;var m={tile:{vertex:"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uMatrix;\nuniform float uFogRadius;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nfloat fogBlur = 200.0;\nvoid main() {\n  vec4 glPosition = uMatrix * aPosition;\n  gl_Position = glPosition;\n  vTexCoord = aTexCoord;\n  //*** fog *******************************************************************\n  vec4 mPosition = uMMatrix * aPosition;\n  float distance = length(mPosition);\n  // => (distance - (uFogRadius - fogBlur)) / (uFogRadius - (uFogRadius - fogBlur));\n  float fogIntensity = (distance - uFogRadius) / fogBlur + 1.1; // <- shifts blur in/out\n  vFogIntensity = clamp(fogIntensity, 0.0, 1.0);\n  //vFogIntensity = 0.0;\n}\n",fragment:"#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nuniform vec3 uFogColor;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nvoid main() {\n  vec3 color = vec3(texture2D(uTexIndex, vec2(vTexCoord.x, -vTexCoord.y)));\n  gl_FragColor = vec4(mix(color, uFogColor, vFogIntensity), 1.0);\n}\n"},skydome:{vertex:"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMatrix;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nfloat gradientHeight = 10.0;\nfloat gradientStrength = 1.0;\nvoid main() {\n  gl_Position = uMatrix * aPosition;\n  vTexCoord = aTexCoord;\n  vFogIntensity = clamp((gradientHeight-aPosition.z) / (gradientHeight/gradientStrength), 0.0, gradientStrength);\n}\n",fragment:"#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTexIndex;\nuniform vec3 uFogColor;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nvoid main() {\n  vec3 color = vec3(texture2D(uTexIndex, vec2(vTexCoord.x, -vTexCoord.y)));\n  gl_FragColor = vec4(mix(color, uFogColor, vFogIntensity), 1.0);\n}\n"}},n=function(b,c){this.map=b,"ontouchstart"in a?(e(c,"touchstart",this.onTouchStart.bind(this)),e(j,"touchmove",this.onTouchMove.bind(this)),e(j,"touchend",this.onTouchEnd.bind(this)),e(c,"gesturechange",this.onGestureChange.bind(this))):(e(c,"mousedown",this.onMouseDown.bind(this)),e(j,"mousemove",this.onMouseMove.bind(this)),e(j,"mouseup",this.onMouseUp.bind(this)),e(c,"dblclick",this.onDoubleClick.bind(this)),e(c,"mousewheel",this.onMouseWheel.bind(this)),e(c,"DOMMouseScroll",this.onMouseWheel.bind(this)));var d;e(a,"resize",function(){d||(d=setTimeout(function(){d=null,b.setSize({width:c.offsetWidth,height:c.offsetHeight})},250))})};n.prototype={prevX:0,prevY:0,startX:0,startY:0,startZoom:0,prevRotation:0,prevTilt:0,disabled:!1,pointerIsDown:!1,onDoubleClick:function(a){this.disabled||(f(a),this.map.setZoom(this.map.zoom+1,a))},onMouseDown:function(a){this.disabled||a.button>1||(f(a),this.startZoom=this.map.zoom,this.prevRotation=this.map.rotation,this.prevTilt=this.map.tilt,this.startX=this.prevX=a.clientX,this.startY=this.prevY=a.clientY,this.pointerIsDown=!0,this.map.emit("pointerdown",{x:a.clientX,y:a.clientY}))},onMouseMove:function(a){this.disabled||(this.pointerIsDown&&(0!==a.button||a.altKey?this.rotateMap(a):this.moveMap(a),this.prevX=a.clientX,this.prevY=a.clientY),this.map.emit("pointermove",{x:a.clientX,y:a.clientY}))},onMouseUp:function(a){this.disabled||this.pointerIsDown&&(0!==a.button||a.altKey?this.rotateMap(a):(Math.abs(a.clientX-this.startX)>5||Math.abs(a.clientY-this.startY)>5)&&this.moveMap(a),this.pointerIsDown=!1,this.map.emit("pointerup",{x:a.clientX,y:a.clientY}))},onMouseWheel:function(a){if(!this.disabled){f(a);var b=0;a.wheelDeltaY?b=a.wheelDeltaY:a.wheelDelta?b=a.wheelDelta:a.detail&&(b=-a.detail);var c=.2*(b>0?1:0>b?-1:0);this.map.setZoom(this.map.zoom+c,a)}},moveMap:function(a){var b=a.clientX-this.prevX,c=a.clientY-this.prevY,e=d(b,c,this.map.rotation*Math.PI/180);this.map.setCenter({x:this.map.center.x-e.x,y:this.map.center.y-e.y})},rotateMap:function(a){this.prevRotation+=(a.clientX-this.prevX)*(360/innerWidth),this.prevTilt-=(a.clientY-this.prevY)*(360/innerHeight),this.map.setRotation(this.prevRotation),this.map.setTilt(this.prevTilt)},onTouchStart:function(a){this.disabled||(f(a),this.startZoom=this.map.zoom,this.prevRotation=this.map.rotation,this.prevTilt=this.map.tilt,a.touches.length>1&&(a=a.touches[0]),this.startX=this.prevX=a.clientX,this.startY=this.prevY=a.clientY,this.map.emit("pointerdown",{x:a.clientX,y:a.clientY}))},onTouchMove:function(a){this.disabled||(a.touches.length>1&&(a=a.touches[0]),this.moveMap(a),this.prevX=a.clientX,this.prevY=a.clientY,this.map.emit("pointermove",{x:a.clientX,y:a.clientY}))},onTouchEnd:function(a){this.disabled||(a.touches.length>1&&(a=a.touches[0]),(Math.abs(a.clientX-this.startX)>5||Math.abs(a.clientY-this.startY)>5)&&this.moveMap(a),this.map.emit("pointerup",{x:a.clientX,y:a.clientY}))},onGestureChange:function(a){this.disabled||(f(a),this.map.setZoom(this.startZoom+(a.scale-1)),this.map.setRotation(this.prevRotation-a.rotation))},destroy:function(){this.disabled=!0}};var o=function(a){this.map=a,this.vMatrix=new h.Matrix,this.pMatrix=new h.Matrix,this.vpMatrix=new h.Matrix,this.skyDome=new p(a)};o.prototype={start:function(){var a=this.map,b=h.context;a.on("resize",this.onResize.bind(this)),this.onResize(),a.on("change",this.onChange.bind(this)),this.onChange(),b.cullFace(b.BACK),b.enable(b.CULL_FACE),b.enable(b.DEPTH_TEST),a.on("contextlost",function(){}.bind(this)),a.on("contextrestored",function(){}.bind(this)),this.loop=setInterval(function(){requestAnimationFrame(function(){b.clearColor(a.fogColor.r,a.fogColor.g,a.fogColor.b,1),b.clear(b.COLOR_BUFFER_BIT|b.DEPTH_BUFFER_BIT),this.skyDome.render(this.vpMatrix);for(var c=a.layers.items,d=0;d<c.length;d++)c[d].render(this.vpMatrix)}.bind(this))}.bind(this),17)},stop:function(){clearInterval(this.loop)},onChange:function(){var a=this.map;this.vMatrix=(new h.Matrix).rotateZ(a.rotation).rotateX(a.tilt),this.vpMatrix=new h.Matrix(h.Matrix.multiply(this.vMatrix,this.pMatrix))},onResize:function(){var a=this.map,b=a.width,c=a.height,d=1024,e=45;this.pMatrix=(new h.Matrix).translate(0,-c/2,-1220).scale(1,-1,1).multiply(new h.Matrix.Perspective(e*c/d,b/c,.1,5e3)).translate(0,-1,0),h.context.viewport(0,0,b,c),this.vpMatrix=new h.Matrix(h.Matrix.multiply(this.vMatrix,this.pMatrix)),this.fogRadius=Math.sqrt(b*b+c*c)/1},destroy:function(){this.stop()}};var p=function(a){this.map=a;var b=this.createGeometry(this.baseRadius);this.vertexBuffer=new h.Buffer(3,new Float32Array(b.vertices)),this.texCoordBuffer=new h.Buffer(2,new Float32Array(b.texCoords)),this.shader=new h.Shader({vertexShader:m.skydome.vertex,fragmentShader:m.skydome.fragment,attributes:["aPosition","aTexCoord"],uniforms:["uMatrix","uTexIndex","uFogColor"]});var c="GLMap/skydome.jpg";this.texture=new h.texture.Image(c,function(a){a&&(this.isReady=!0)}.bind(this))};p.prototype={baseRadius:500,createGeometry:function(a){for(var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s=8,t=24,u=[],v=[],w=Math.sin,x=Math.cos,y=Math.PI,z=0;t>z;z++)for(n=z/t,b=2*n*y,c=x(b)*a,d=w(b)*a,o=(z+1)/t,e=2*o*y,f=x(e)*a,g=w(e)*a,r=0;s>r;r++)h=r*y/(2*s),i=(r+1)*y/(2*s),j=[c*x(h),d*x(h),a*w(h)],k=[f*x(h),g*x(h),a*w(h)],l=[f*x(i),g*x(i),a*w(i)],m=[c*x(i),d*x(i),a*w(i)],u.push.apply(u,j),u.push.apply(u,k),u.push.apply(u,l),u.push.apply(u,j),u.push.apply(u,l),u.push.apply(u,m),p=1-(r+1)/s,q=1-r/s,v.push(n,q,o,q,o,p,n,q,o,p,n,p);return{vertices:u,texCoords:v}},render:function(a){if(this.isReady){var b=this.map,c=h.context,d=b.fogColor,e=this.shader;e.enable(),c.uniform3fv(e.uniforms.uFogColor,[d.r,d.g,d.b]);var f=new h.Matrix,g=b.renderer.fogRadius/this.baseRadius;f.scale(g,g,g),c.uniformMatrix4fv(e.uniforms.uMatrix,!1,h.Matrix.multiply(f,a)),this.vertexBuffer.enable(),c.vertexAttribPointer(e.attributes.aPosition,this.vertexBuffer.itemSize,c.FLOAT,!1,0,0),this.texCoordBuffer.enable(),c.vertexAttribPointer(e.attributes.aTexCoord,this.texCoordBuffer.itemSize,c.FLOAT,!1,0,0),this.texture.enable(0),c.uniform1i(e.uniforms.uTexIndex,0),c.drawArrays(c.TRIANGLES,0,this.vertexBuffer.numItems),e.disable()}},destroy:function(){this.texture.destroy()}};var q=function(a){this.map=a,this.items=[]};q.prototype={add:function(a){this.items.push(a)},remove:function(a){for(var b=0;b<this.items.length;b++)if(this.items[b]===a)return void this.items.splice(b,1)},getAttribution:function(){for(var a=[],b=0;b<this.items.length;b++)this.items[b].attribution&&a.push(this.items[b].attribution);return a},destroy:function(){for(var a=0;a<this.items.length;a++)this.items[a].destroy();this.items=null}},l.TileLayer=function(a,b){this.source=a,b=b||{},this.attribution=b.attribution,this.minZoom=parseFloat(b.minZoom)||0,this.maxZoom=parseFloat(b.maxZoom)||18,this.maxZoom<this.minZoom&&(this.maxZoom=this.minZoom),this.buffer=b.buffer||1,this.shader=new h.Shader({vertexShader:m.tile.vertex,fragmentShader:m.tile.fragment,attributes:["aPosition","aTexCoord"],uniforms:["uMatrix","uMMatrix","uTexIndex","uFogRadius","uFogColor"]}),this.tiles={}},l.TileLayer.prototype={addTo:function(a){this.map=a,a.addLayer(this),a.on("change",function(){this.update(2e3)}.bind(this)),a.on("resize",this.update.bind(this)),this.update()},remove:function(){clearTimeout(this.isWaiting),this.map.removeLayer(this),this.map=null},update:function(a){var b=this.map;if(!(b.zoom<this.minZoom||b.zoom>this.maxZoom))return a?void(this.isWaiting||(this.isWaiting=setTimeout(function(){this.isWaiting=null,this.loadTiles()}.bind(this),a))):void this.loadTiles()},getURL:function(a,b,c){var d={s:"abcd"[(a+b)%4],x:a,y:b,z:c};return this.source.replace(/\{(\w+)\}/g,function(a,b){return d[b]||a})},updateBounds:function(){var a=this.map,b=Math.round(a.zoom),c=1500,d=Math.pow(2,b-a.zoom)/l.TILE_SIZE,e=a.center;this.minX=(e.x-c)*d<<0,this.minY=(e.y-c)*d<<0,this.maxX=Math.ceil((e.x+c)*d),this.maxY=Math.ceil((e.y+c)*d)},loadTiles:function(){this.updateBounds();var a,c,d,e,f=this.map,g=Math.round(f.zoom),h=[],i=[f.center.x/l.TILE_SIZE<<0,f.center.y/l.TILE_SIZE<<0];for(c=this.minY;c<this.maxY;c++)for(a=this.minX;a<this.maxX;a++)d=[a,c,g].join(","),this.tiles[d]||(this.tiles[d]=new l.Tile(a,c,g),h.push({tile:this.tiles[d],dist:b([a,c],i)}));if(e=h.length){h.sort(function(a,b){return a.dist-b.dist});for(var j,k=0;e>k;k++)j=h[k].tile,j.load(this.getURL(j.x,j.y,j.zoom));this.purge()}},purge:function(){for(var a in this.tiles)this.isVisible(this.tiles[a],this.buffer)||(this.tiles[a].destroy(),delete this.tiles[a])},isVisible:function(a,b){b=b||0;var c=a.x,d=a.y,e=Math.round(this.map.zoom);return a.zoom===e&&c>=this.minX-b&&c<=this.maxX+b&&d>=this.minY-b&&d<=this.maxY+b},render:function(a){var b,c,d=this.map,e=d.fogColor,f=h.context,g=this.shader,i=Math.round(d.zoom),j=1/Math.pow(2,i-d.zoom),k=d.center;g.enable(),f.uniform1f(g.uniforms.uFogRadius,d.renderer.fogRadius),f.uniform3fv(g.uniforms.uFogColor,[e.r,e.g,e.b]);for(var m in this.tiles)b=this.tiles[m],b.isReady&&(c=new h.Matrix,c.scale(1.005*j,1.005*j,1),c.translate(b.x*l.TILE_SIZE*j-k.x,b.y*l.TILE_SIZE*j-k.y,0),f.uniformMatrix4fv(g.uniforms.uMMatrix,!1,c.data),f.uniformMatrix4fv(g.uniforms.uMatrix,!1,h.Matrix.multiply(c,a)),b.vertexBuffer.enable(),f.vertexAttribPointer(g.attributes.aPosition,b.vertexBuffer.itemSize,f.FLOAT,!1,0,0),b.texCoordBuffer.enable(),f.vertexAttribPointer(g.attributes.aTexCoord,b.texCoordBuffer.itemSize,f.FLOAT,!1,0,0),b.texture.enable(0),f.uniform1i(g.uniforms.uTexIndex,0),f.drawArrays(f.TRIANGLE_STRIP,0,b.vertexBuffer.numItems));g.disable()},destroy:function(){for(var a in this.tiles)this.tiles[a].destroy();this.tiles=null,this.remove()}},l.Tile=function(a,b,c){this.x=a,this.y=b,this.zoom=c;for(var d=4,e=255/d,f=1/d,g=[],i=[],j=0;d>j;j++)for(var k=0;d>k;k++)g.push((j+1)*e,(k+1)*e,0,(j+1)*e,(k+0)*e,0,(j+0)*e,(k+1)*e,0,(j+0)*e,(k+0)*e,0),i.push((j+1)*f,(k+1)*f,(j+1)*f,(k+0)*f,(j+0)*f,(k+1)*f,(j+0)*f,(k+0)*f);this.vertexBuffer=new h.Buffer(3,new Float32Array(g)),this.texCoordBuffer=new h.Buffer(2,new Float32Array(i))},l.Tile.prototype={load:function(a){this.texture=new h.texture.Image(a,function(a){a&&(this.isReady=!0)}.bind(this))},destroy:function(){this.vertexBuffer.destroy(),this.texCoordBuffer.destroy(),this.texture&&this.texture.destroy()}}}(this);