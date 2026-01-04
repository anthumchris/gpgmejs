#include <napi.h>
#include <gpgme++/engineinfo.h>

using namespace GpgME;
using namespace Napi;
using namespace std;

string version = engineInfo(Protocol::OpenPGP).version();

Object init(Env env, Object exports) {
  exports.Set("gpgVersion", String::New(env, version));
  return exports;
}

NODE_API_MODULE(TODO_no_effect, init)
